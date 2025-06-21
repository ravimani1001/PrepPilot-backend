# 🧠 PrepPilot, AI-Powered Interview Preparation Platform - Backend

This is the backend service for the **AI-Powered Interview Preparation Platform**, built with Node.js, Express.js, and MongoDB. It enables users to generate interview questions, receive AI feedback on answers, and analyze resumes using Gemini AI API.

---

## 🚀 Features

- ✅ **User Authentication** (Signup/Login with JWT)  
- 📋 **Interview Q&A Module**
  - Generate role-specific questions using AI
  - Submit answers and get AI feedback
  - Store and retrieve previous sessions
- 📄 **Resume Analyzer**
  - Upload resume
  - Get AI-based structured feedback (Positives, Negatives, Suggestions)
- 📊 **Dashboard APIs**
  - View past sessions and resume analyses
- Input validation and secure endpoints

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT  
- **AI Integration:** Gemini API
- **Others:** dotenv, multer, axios

---

## 📁 Project Structure

```
/backend
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── interviewController.js
│   └── resumeController.js
├── models/
│   ├── User.js
│   ├── InterviewSession.js
│   └── ResumeAnalysis.js
├── routes/
│   ├── authRoutes.js
│   ├── interviewRoutes.js
│   └── resumeRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── upload.js
│   ├── validateAuth.js
│   └── wrapperUpload.js
├── services/
│   └── geminiService.js            # Gemini/OpenAI API logic
├── .env
├── app.js
└── server.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following keys:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_gemini_api_key
```

---

## 🧪 API Endpoints

### Auth Routes

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/api/auth/signup` | Register new user    |
| POST   | `/api/auth/login`  | Login and get token  |

### Interview Preparation

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/interview/generate`     | Start Q&A session (generate Qs)   |
| PATCH   | `/api/interview/:sessionId/:questionIndex/answer`    | Submit answer, get AI feedback    |
| GET    | `/api/interview/sessions`   | Get past user sessions                  |
| GET    | `/api/interview/session/:id`       | Get session by ID                  |
| DELETE   | `/api/interview/:id`     | Deletes seesion   |

### Resume Analyzer

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/resume/analyze`     | Analyze resume with AI            |


---


## 🔧 Future Improvements

- ✅ Google/GitHub OAuth support  
- ✅ Export Q&A sessions or feedback as PDF  
- ✅ Chat-style Q&A experience

---

## 🧑‍🎓 Created By

**Ravi Mani**  
Backend Developer  
[LinkedIn](https://linkedin.com/in/ravimani17) • [GitHub](https://github.com/ravimani1001)

---
