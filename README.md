# 📚 LMS - Full-Stack Learning Management System

**LMS** is a modern, production-ready **Learning Management System** built using the **MERN stack** (MongoDB, Express, React, Node.js).  
It comes with **secure authentication (Clerk)**, **Stripe payments with webhook verification**, and **Cloudinary for media storage**.  
Educators can create/manage courses, while students can browse, purchase, and track their learning journey.

---

## 🌍 Live Demo

🔗[ https://your-live-link.com ](https://lms-frontend-cyan-nu.vercel.app/) 

---

## 📸 Screenshots

### 🏠 Home Page
<img width="1902" height="890" alt="Screenshot 2025-09-07 144709" src="https://github.com/user-attachments/assets/b680ace1-a6c4-48d5-9a44-bd5b6dc29f4b" />


### 📚 Course Listing
<img width="1912" height="889" alt="Screenshot 2025-09-07 145257" src="https://github.com/user-attachments/assets/5e5bbab1-c2eb-4cc2-931f-dfe2f25fddd8" />


### 📖 Course Details
<img width="1903" height="889" alt="Screenshot 2025-09-07 144827" src="https://github.com/user-attachments/assets/3b870d83-366f-4403-899d-c40000cbd6bb" />


### 👨‍🏫 Educator Dashboard
<img width="1900" height="885" alt="Screenshot 2025-09-07 144746" src="https://github.com/user-attachments/assets/ab05f828-8f34-49cc-8a9b-7a3aab8dfd6e" />
<img width="1908" height="900" alt="Screenshot 2025-09-07 144757" src="https://github.com/user-attachments/assets/1e3193cc-34c6-41dd-9f6b-13a5a40d6251" />
<img width="1912" height="893" alt="Screenshot 2025-09-07 144804" src="https://github.com/user-attachments/assets/575e94a7-fc54-401e-8385-1fbb2569c061" />





### 💳 Stripe Checkout
<img width="1883" height="890" alt="Screenshot 2025-09-07 145157" src="https://github.com/user-attachments/assets/784629b5-70ee-47d3-b274-e95478a65431" />




---
## ✨ Highlights

- 🔐 User authentication & role-based access with **Clerk**
- 👨‍🏫 Educator dashboard for managing courses, chapters, and videos
- 👩‍🎓 Student dashboard with enrollment tracking & course progress
- 💳 Secure payments using **Stripe Checkout** + real-time **Webhook updates**
- 🎥 Video player and progress tracker
- ☁️ **Cloudinary** integration for image/video uploads
- 📊 Course ratings & progress analytics
- 📱 Responsive UI built with **Tailwind CSS**
- 🚀 Deployment-ready on **Vercel/Render** with environment variable management

---

## 🛠 Tech Stack

### Frontend
- ⚛️ **React 18** + Context API  
- 🎨 **Tailwind CSS** for modern, responsive UI  
- 🔑 **Clerk** (OAuth + Email/Password login)  
- 💳 **Stripe Checkout** + Webhooks  
- 📡 **Axios** for API calls  
- 🔔 Toast notifications for real-time feedback  

### Backend
- 🟢 **Node.js + Express.js** REST API  
- 🍃 **MongoDB + Mongoose** for data persistence  
- 🔑 **Clerk middleware** for route protection  
- 💳 **Stripe Webhooks** for secure payment status updates  
- ☁️ **Cloudinary + Multer** for media uploads  
- 🛡️ Role-based authorization for educators  

---

## ⚙️ Core Features

### 👨‍🏫 Educators
- Create & manage courses, lectures, and media  
- Upload course thumbnails via **Cloudinary**  
- Track enrolled students & earnings  

### 👩‍🎓 Students
- Browse/search courses with filters  
- Enroll & purchase courses securely via **Stripe Checkout**  
- Watch lessons with progress tracking  
- Leave ratings & reviews  

### 🔒 Authentication & Security
- Role-based access control with **Clerk**  
- Supports **Google** and **Email/Password** login  
- Protected routes with Clerk middleware  

### 💳 Payments
- Integrated **Stripe Checkout** for payments  
- Real-time purchase verification via **Stripe Webhooks**  
- Purchase records saved with `pending → completed/failed` states  

### 📈 Tracking & Ratings
- Track course progress per student  
- Mark lectures completed via API  
- Ratings & reviews stored in backend, displayed in frontend  

---

## ⚡ Getting Started
### 1️⃣ Clone Repository

git clone https://github.com/Tanmayasahoo3536/lms.git

cd lms

# 📦 Install Dependencies

# Backend
cd server
npm install

# Frontend
cd client
npm install

# ⚙️ Run Project

# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start

# 🔑 Environment Variables (server/.env)

PORT=5000
MONGO_URI=your_mongodb_uri
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
FRONTEND_URL=http://localhost:5173


## 👨‍💻 Author

**Tanmaya Sahoo**  
📧 [tanmaysahoo3536@gmail.com](mailto:tanmaysahoo3536@gmail.com)  
🔗 [GitHub: Tanmayasahoo3536](https://github.com/Tanmayasahoo3536)  
