import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar({ onClose }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="sidebar card">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <nav>
        {/* Home link only visible to non-authenticated users */}
        {!isAuthenticated && (
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={onClose}
            end
          >
            🏠 Home
          </NavLink>
        )}

        {/* Dashboard and other links only for authenticated users */}
        {isAuthenticated && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={onClose}
            >
              📊 Dashboard
            </NavLink>

            {user?.role === "interviewer" && (
              <NavLink
                to="/my-interviews"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={onClose}
              >
                📝 My Interviews
              </NavLink>
            )}

            {user?.role === "interviewee" && (
              <NavLink
                to="/my-bookings"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={onClose}
              >
                📅 My Bookings
              </NavLink>
            )}

            {user?.role === "interviewer" && (
              <NavLink
                to="/create-interview"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={onClose}
              >
                ➕ Create Interview
              </NavLink>
            )}

            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={onClose}
            >
              👤 Profile
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
