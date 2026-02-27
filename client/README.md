# 🚀 Mock Interview Application - Client

This directory contains the frontend source code for the Mock Interview Application, built with React and Vite.

## 📖 Application Overview & Workflow

> **Note:** For the complete application startup instructions, backend details, and tech stack, please refer to the [Main README](../README.md) in the root directory.

The frontend is responsible for delivering a smooth and interactive experience for all users of the platform. The workflow is divided by roles:

### 🎯 Interviewee Workflow
- **Public & Home Pages**: View available interviews with domain-specific filtering.
- **Authentication**: Register, login, and reset passwords securely.
- **Booking Flow**: Proceed from interview details to a booking system where available slots are selected.
- **Dashboard**: Access the `/my-bookings` route to manage scheduled and past mock interviews securely.

### 👔 Interviewer Workflow
- **Creation Dashboard**: Authenticated interviewers can access the `/create-interview` route to publish new mock sessions.
- **Management**: Track published interviews using the `/my-interviews` route.

## 🛠️ Running the Client Locally

Typically, the client and server are started together from the root using `npm run dev`. However, to run only the frontend:

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies (if not done already):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🗂️ Key Client Directories

- `/src/pages` - View layer mapping to the application's React Router paths.
- `/src/components` - Reusable UI components (Layout, Auth guards, etc.).
- `/src/routes` - Public and Protected route handler logic.
