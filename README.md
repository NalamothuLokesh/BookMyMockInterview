# 🚀 Mock Interview Application

Welcome to the **Mock Interview App**! This is a comprehensive full-stack platform designed to bridge the gap between aspiring candidates and experienced industry professionals. It enables users to seamlessly browse, book, and conduct 1-on-1 mock interviews across various tech domains.

## 🌟 Key Features

- **Role-Based Access Control**: Tailored workflows and routing for `Interviewees`, `Interviewers`, and `Admins`.
- **Domain Specialization**: Filter and find interviews across specific domains such as *DSA*, *Frontend*, *Backend*, *Fullstack*, *System Design*, *HR*, *DevOps*, and *Cyber Security*.
- **Seamless Booking Management**: Easy-to-use booking system for scheduling interviews based on interviewer scheduling and availability logic.
- **Secure Authentication**: Robust user authentication handling with JWT, bcrypt password hashing, and complete password reset functionality.
- **Responsive Design**: Modern, fast, and responsive user interface built with React and Vite.

## 🔄 Application Workflow

The application supports distinct and intuitive workflows based on user roles:

### 🎯 For Interviewees (Candidates)
1. **Explore**: Browse available mock interviews on the Home page. Use domain filters to find the right fit for your practice.
2. **Review**: Check detailed interview descriptions, durations, pricing, and the interviewer's rating and reviews.
3. **Book**: Select an available time slot that matches your schedule and successfully book the interview.
4. **Manage**: Keep track of all your upcoming schedules and past sessions in the **My Bookings** dashboard.
5. **Interview**: Join the scheduled meeting directly via the provided meeting link in your booking details.

### 👔 For Interviewers
1. **Setup**: Create your profile and define your expertise domains to stand out to candidates.
2. **Create Interviews**: Publish new mock interview offerings (e.g., "1-Hour System Design Focus", "Frontend Mock Interview") by setting the price, defining duration, and adding available slots.
3. **Manage Offerings**: View and manage all your published interviews from the **My Interviews** dashboard.
4. **Conduct Sessions**: Meet with your candidates at the scheduled times using the automatically managed meeting details.

## 💻 Tech Stack

- **Frontend**: React (Vite), React Router DOM (v6)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (Models for Users, Interviews, and Bookings)
- **Security**: `bcryptjs` for secure password caching, `jsonwebtoken` (JWT) for secure routing and authentication.

## 🛠️ Local Setup & Installation

Follow these steps to get the project running locally on your machine.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd mock-interview-app
   ```

2. **Environment Variables:**
   - Create a `.env` file in the **root** folder for backend variables (e.g., `MONGO_URI`, `JWT_SECRET`, port numbers).
   - Create a `.env` file in the **client** directory for frontend configurations.
   *(Refer to template files if they are available).*

3. **Install Dependencies:**
   Install dependencies for both the frontend and backend simultaneously using the provided root package script:
   ```bash
   npm run install-all
   ```

4. **Run the Application (Development Mode):**
   ```bash
   # This runs both the client and server concurrently
   npm run dev
   ```

5. **Access the App:** 
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your console output).

## 🗂️ Project Structure

- `/client` - Contains the React + Vite frontend application.
- `/server` - Contains the Node.js Express backend, Mongoose models, controllers, and route handlers.
- `README.md` - Primary project documentation.
