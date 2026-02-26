import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="container">
      <div className="card">
        <h1>Mock Interview Platform</h1>

        <p className="muted mb-12">Sharpen your interview skills or earn by mentoring — built for both interviewers and interviewees.</p>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div className="card">
            <h3>For Interviewers</h3>
            <ul>
              <li>Host mock interviews and set your own availability.</li>
              <li>Receive bookings and manage attendees.</li>
              <li>Get paid per session (optional).</li>
            </ul>
            <div className="mt-10">
              <Link to="/register?role=interviewer">
                <button className="btn btn-primary">Become an interviewer</button>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3>For Interviewees</h3>
            <ul>
              <li>Book real mock interviews with experienced interviewers.</li>
              <li>Practice with feedback and improve your confidence.</li>
              <li>Manage your bookings and cancel if needed.</li>
            </ul>
            <div className="mt-10">
              <Link to="/register?role=interviewee">
                <button className="btn btn-primary">Get started — sign up</button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/login">
            <button className="btn btn-ghost mr-10">Login</button>
          </Link>

          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}