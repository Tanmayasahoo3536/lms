import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

//update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    // const userId = req.auth.userId;

    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decodedtoken = jwt.decode(token);
    const userId = decodedtoken.sub;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Add new course

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decodedtoken = jwt.decode(token);
    const educatorId = decodedtoken.sub;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    console.log(newCourse);
    console.log("before" + parsedCourseData.educator);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    // console.log(imageUpload);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: "course added" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Get educator Courses Function

export const getEducatorCourses = async (req, res) => {
  try {
    // const educator = req.auth.userId;
    const authToken=req.headers.authorization
     // console.log(header)
    const token = authToken.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
            const decodedtoken = jwt.decode(token);
            const educator = decodedtoken.sub;
            console.log(educator)
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Dashboard Data (Total Earning, Enrolled Students, No of Courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const authToken=req.headers.authorization
     // console.log(header)
    const token = authToken.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        const decodedtoken = jwt.decode(token);
        const educator = decodedtoken.sub;
        console.log(educator)
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // calculate total Earnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // collect unique enrolled student Ids with their courseTitles
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Enrolled Students Data with purchase Data
export const getEnrolledStudentsData = async (req, res) => {
    try {

      // const userId = req.auth.userId;

      const authToken = req.headers.authorization;
      const token = authToken.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      }
      const decodedtoken = jwt.decode(token);
      const educator = decodedtoken.sub;
        const courses = await Course.find({ educator });
        const courseIds = courses.map((course) => course._id);

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: "completed",
        })
        .populate("userId", "name imageUrl")
        .populate("courseId", "courseTitle");

        const enrolledStudents = purchases.map((purchase) => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt,
        }));
        res.json({ success: true, enrolledStudents });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
