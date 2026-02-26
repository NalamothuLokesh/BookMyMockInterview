import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import BookInterview from "./pages/BookInterview";
import InterviewDetail from "./pages/InterviewDetail";
import Profile from "./pages/Profile";
import CreateInterview from "./pages/CreateInterview";
import MyInterviews from "./pages/MyInterviews";
import MyBookings from "./pages/MyBookings";
import Layout from "./components/layout/Layout";


// route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>

      {/* ---------- PUBLIC ROUTES ---------- */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />

      {/* <Route
  path="/book"
  element={
    <ProtectedRoute>
      <BookInterview />
    </ProtectedRoute>
  }
/> */}

      {/* <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/> */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} /> */}

      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />



      {/* ---------- PROTECTED ROUTES ---------- */}

      <Route
        path="/create-interview"
        element={
          <ProtectedRoute>
            <CreateInterview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book"
        element={
          <ProtectedRoute>
            <Layout>
              <BookInterview />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <InterviewDetail />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-interviews"
        element={
          <ProtectedRoute>
            <Layout>
              <MyInterviews />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <Layout>
              <MyBookings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />



      {/* ---------- DEFAULT ROUTE ---------- */}

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;