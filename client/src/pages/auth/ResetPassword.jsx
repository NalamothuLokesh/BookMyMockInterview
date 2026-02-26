import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/auth/reset-password/${token}`, { password });
      setMsg("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card auth-page">
        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button className="btn btn-primary">Reset Password</button>
          </div>
        </form>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}