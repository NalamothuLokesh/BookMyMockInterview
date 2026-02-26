import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function BookInterview() {
  const [interviews, setInterviews] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const { user } = useAuth();

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

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await api.get("/interviews");
        setInterviews(data);
      } catch (error) {
        console.error("Failed to fetch interviews", error);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = selectedDomain
    ? interviews.filter((interview) => interview.domain === selectedDomain)
    : interviews;

  return (
    <div className="container">
      <h1 className="mb-14">Available Interviews</h1>

      <div className="mb-14" style={{ maxWidth: '300px' }}>
        <label>Filter by Domain</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <option value="">All Domains</option>
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {filteredInterviews.length === 0 ? (
        <p className="muted">No interviews available.</p>
      ) : (
        <div className="grid">
          {filteredInterviews.map((interview) => (
            <div key={interview._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{interview.title}</h3>
                  <p className="muted small" style={{ margin: '0.2rem 0 0 0' }}>By {interview.interviewer?.name || 'Unknown'}</p>
                  <p className="badge" style={{ marginTop: '0.5rem', display: 'inline-block', fontSize: '0.75rem' }}>{interview.domain}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: 'var(--accent)' }}>₹{interview.price}</div>
                  <div className="small muted">{interview.duration} mins</div>
                </div>
              </div>

              <p style={{ margin: 0, flex: 1 }}>{interview.description}</p>

              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <Link to={`/interview/${interview._id}`} className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  View & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}