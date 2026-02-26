import { useState } from "react";
import { authService } from "../../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Preselect role from query param (e.g. /register?role=interviewer)
  const params = new URLSearchParams(location.search);
  const presetRole = params.get("role") === "interviewer" ? "interviewer" : "interviewee";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: presetRole
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(form);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setServerError("");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setServerError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card auth-page" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          {serverError && <div className="input-error">{serverError}</div>}
          {successMessage && <div className="badge" style={{ background: 'rgba(34,197,94,0.12)', color: '#10b981', marginBottom: 8 }}>{successMessage}</div>}

          <div className="input-group">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Select Role:</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="interviewee">Interviewee</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          <div>
            <button className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <span className="muted">Already have an account? </span>
            <Link to="/login" style={{ fontWeight: '600' }}>Login here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}