import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0,2).join("")
    : "U";

  return (
    <nav className="navbar card">
      <div className="brand">
        <div className="logo">
          <h1 className="small">MOCK INTERVIEW</h1>
        </div>
        {user?.role && (
          <div className="badge role-badge">{user.role}</div>
        )}
      </div>

      <div className="row nav-actions">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="btn btn-ghost mr-10">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <div className="row" style={{ alignItems: "center", gap: 8 }}>
                <div className="avatar">{initials}</div>
                <div className="user-name muted small" title={user?.name}>{user?.name}</div>
                <button className="btn btn-ghost" onClick={logout}>Logout</button>
              </div>
          </>
        )}
      </div>
    </nav>
  );
}
