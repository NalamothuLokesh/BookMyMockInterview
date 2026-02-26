import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function CreateInterview() {
  const navigate = useNavigate();
  const { user, loading: authloading } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    domain: "DSA"
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const allowedDurations = [30, 45, 60, 90];
  const domains = [
    "DSA",
    "Frontend",
    "Backend",
    "Fullstack",
    "System Design",
    "HR",
    "DevOps",
    "Cyber Security"
  ];

  // wait until auth finishes loading before enforcing role check
  if (authloading) {
    return <div className="p-40">Loading...</div>;
  }

  // 🔒 Extra safety (frontend role check)
  if (user?.role !== "interviewer") {
    return (
      <div className="p-40">
        <h2>Access Denied</h2>
        <p className="muted">Only users with the <strong>interviewer</strong> role can create interviews. Use the "Become an interviewer" option on the Home page to sign up as an interviewer.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // client-side validation
    const newErrors = {};
    if (!form.title || !form.title.trim()) newErrors.title = "Title is required";
    if (form.title && form.title.length > 100) newErrors.title = "Title must be 100 characters or less";
    if (!allowedDurations.includes(Number(form.duration))) newErrors.duration = "Please select a valid duration";
    if (form.price === "" || Number(form.price) < 0) newErrors.price = "Price must be 0 or greater";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});
    setServerError("");

    try {
      await api.post("/interviews", { ...form, duration: Number(form.duration), price: Number(form.price) });
      setSuccessMessage("Interview created successfully!");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (error) {
      // API throws parsed JSON, try to use message
      const msg = (error && (error.message || error.msg || error.error)) || JSON.stringify(error);
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Create Interview</h1>

        <form onSubmit={handleSubmit} className="">

          {serverError && <div className="input-error">{serverError}</div>}
          {successMessage && <div className="badge" style={{ background: 'rgba(34,197,94,0.12)', color: '#10b981', marginBottom: 8 }}>{successMessage}</div>}

          <div className="input-group">
            <input
              name="title"
              placeholder="Interview Title"
              value={form.title}
              onChange={handleChange}
              maxLength={100}
              required
            />
            <div className="muted small">Required — max 100 characters</div>
            {errors.title && <div className="input-error">{errors.title}</div>}
          </div>

          <div className="input-group">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              maxLength={1000}
            />
            <div className="muted small">Optional — max 1000 characters</div>
          </div>

          <div className="input-group">
            <label>Select Duration</label>
            <select name="duration" value={form.duration} onChange={handleChange} required>
              <option value="">Choose duration</option>
              {allowedDurations.map((d) => (
                <option key={d} value={d}>{d} minutes</option>
              ))}
            </select>
            <div className="muted small">Allowed durations: {allowedDurations.join(", ")}</div>
            {errors.duration && <div className="input-error">{errors.duration}</div>}
          </div>

          <div className="input-group">
            <label>Domain</label>
            <select name="domain" value={form.domain} onChange={handleChange}>
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              min={0}
              required
            />
            <div className="muted small">Price must be 0 or greater</div>
            {errors.price && <div className="input-error">{errors.price}</div>}
          </div>

          <div>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Interview"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}