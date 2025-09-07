import { Webhook } from "svix";
import Stripe from "stripe";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------- Clerk Webhooks -----------------
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name}${data.last_name ? " " + data.last_name : ""}`,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name}${data.last_name ? " " + data.last_name : ""}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        res.json({});
        break;
    }
  } catch (error) {
    res.status(503).json({ success: false, message: error.message });
  }
};

// ----------------- Stripe Checkout Session -----------------
export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // create a new purchase with "pending" status
    const purchase = await Purchase.create({
      courseId,
      userId,
      amount: course.price,
      status: "pending",
    });

    // create checkout session with purchaseId in metadata
    const session = await stripeInstance.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: course.title },
            unit_amount: course.price * 100, // cents
          },
          quantity: 1,
        },
      ],
      metadata: { purchaseId: purchase._id.toString() }, // 👈 important
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------- Stripe Webhooks -----------------
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Stripe Event:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { purchaseId } = session.metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      if (!purchaseData) break;

      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(purchaseData.courseId);

      if (userData && courseData) {
        // update enrolled students + user courses
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();

        userData.enrolledCourses.push(courseData._id);
        await userData.save();
      }

      // update purchase status
      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      const { purchaseId } = session.metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      if (purchaseData) {
        purchaseData.status = "failed";
        await purchaseData.save();
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
