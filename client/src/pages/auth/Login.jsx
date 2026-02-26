import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await authService.login(form);

      console.log("LOGIN RESPONSE →", userData); // DEBUG

      login(userData); // pass data to context

      navigate("/dashboard");

    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card auth-page" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <span className="muted">Don't have an account? </span>
            <Link to="/register" style={{ fontWeight: '600' }}>Register here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}