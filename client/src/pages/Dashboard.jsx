import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>

        <div className="mt-12" />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div className="muted">Use the actions to the right or the sidebar to navigate.</div>

          <div style={{ display: "flex", gap: 10 }}>
            {user?.role === "interviewer" && (
              <>
                <Link to="/create-interview">
                  <button className="btn btn-primary">Create Interview</button>
                </Link>

                <Link to="/my-interviews">
                  <button className="btn">My Interviews</button>
                </Link>
              </>
            )}

            {user?.role === "interviewee" && (
              <Link to="/book">
                <button className="btn btn-primary">Book Interview</button>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}