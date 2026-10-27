# AI-Based Personalized Learning Path Generator

An intelligent, full-stack adaptive learning application designed to transform career goals into personalized, structured learning roadmaps with diagnostic assessments, dynamic topic quizzes, AI tutor guidance, and progress tracking.

---

## 🌟 Key Features

1. **AI-Powered Skill Gap Analysis**:
   - Evaluates current user knowledge, education level, experience level, and study schedules.
   - Diagnostic assessments score student competency and classify skills into **Strong**, **Needs Improvement**, and **Missing Prerequisites**.

2. **Personalized Adaptive Learning Path**:
   - Generates structured, phase-by-phase learning paths respecting strict prerequisite dependencies (e.g., JavaScript before React).
   - Dynamically re-adjusts the roadmap based on Quiz scores (fast-tracking for high scores, remedial modules for scores requiring revision).

3. **Interactive AI Learning Tutor**:
   - 24/7 AI Tutor built using Gemini API (with robust offline/fallback engines).
   - Solves student queries, explains complex concepts, provides code snippets, and generates real-time practice questions.

4. **Interactive Dashboard & Recharts Analytics**:
   - Visualizes overall completion %, active daily streaks, and weekly study time.
   - Interactive horizontal Bar chart for skill level mastery and Area chart for weekly activity tracking.

5. **Dual Database & Execution Mode**:
   - Connects to MongoDB when available.
   - Automatically switches to an **In-Memory Fallback Store** if MongoDB is offline, allowing 100% full feature availability without requiring database daemons.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React Icons, Recharts, React Router v7, Axios
- **Backend**: Node.js, Express.js, Mongoose, JWT Authentication, Bcryptjs
- **AI Integration**: Google Generative AI (`@google/generative-ai` Gemini model) with fallback rules engine

---

## 🚀 Installation & Running Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Optional: app automatically uses In-Memory store if MongoDB is not running)

---

### Step 1: Server Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   A `.env` file is located in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/personalized_learning_db
   JWT_SECRET=super_secret_jwt_key_learning_path_generator_2026
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=development
   ```

4. (Optional) Seed Database:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   # Server runs at http://localhost:5000
   ```

---

### Step 2: Client Setup

1. Open a second terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   # App runs at http://localhost:5173
   ```

4. Build for Production:
   ```bash
   npm run build
   ```

---

## 🗺️ Learning Roadmap Flow

```
[User Registration / Login]
         │
         ▼
[Profile Setup (Goal & Hours)]
         │
         ▼
[Diagnostic Skill Assessment]
         │
         ▼
[AI Skill Gap Analysis]
         │
         ▼
[Personalized Roadmap Generation]
         │
         ├─────────────────────────────────────────┐
         ▼                                         ▼
[Topic Study & Code Examples]            [Interactive AI Tutor Chat]
         │
         ▼
[Topic Knowledge Quiz]
         │
         ▼
[Adaptive Re-Adjustment Engine] ──(Score Update)──► [Student Dashboard]
```

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new student account |
| `POST` | `/api/auth/login` | Authenticate student and get JWT |
| `GET` | `/api/auth/me` | Get current logged-in user profile |
| `GET` | `/api/profile` | Retrieve student profile details |
| `PUT` | `/api/profile` | Update profile goals and study hours |
| `GET` | `/api/assessment/questions` | Get diagnostic assessment questions |
| `POST` | `/api/assessment/submit` | Submit assessment & evaluate skill gaps |
| `POST` | `/api/learning-path/generate` | AI-generate personalized roadmap |
| `GET` | `/api/learning-path` | Get current user roadmap |
| `PUT` | `/api/learning-path/update-topic-status` | Toggle topic completion status |
| `GET` | `/api/quiz/:topicName` | Get topic quiz questions |
| `POST` | `/api/quiz/:topicName/submit` | Submit quiz & trigger adaptive adjustment |
| `POST` | `/api/ai/tutor` | Chat with AI Tutor |
| `GET` | `/api/progress` | Fetch student metrics for Dashboard & Recharts |
