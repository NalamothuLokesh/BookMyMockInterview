import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function InterviewDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const data = await api.get(`/interviews/${id}`);
                setInterview(data);
            } catch (err) {
                setError(err.message || "Failed to fetch interview details");
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [id]);

    const handleBook = async () => {
        try {
            if (!selectedDate) {
                alert("Please select a date first");
                return;
            }

            await api.post("/interviews/book", {
                interviewId: interview._id,
                scheduledAt: selectedDate
            });

            alert("Interview booked successfully!");
            navigate("/my-bookings");
        } catch (error) {
            alert(error.message || "Booking failed");
        }
    };

    if (loading) return <div className="p-40">Loading...</div>;
    if (error) return <div className="p-40 input-error">{error}</div>;
    if (!interview) return <div className="p-40">Interview not found</div>;

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ margin: '0 0 0.5rem 0' }}>{interview.title}</h1>
                        <p className="badge" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.8rem', display: 'inline-block' }}>{interview.domain}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>₹{interview.price}</div>
                        <div className="muted">{interview.duration} mins</div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h3>Description</h3>
                    <p style={{ lineHeight: '1.6' }}>{interview.description || "No description provided."}</p>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ marginTop: 0 }}>Interviewer Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', margin: '1rem 0 0 0' }}>
                        <strong className="muted">Name:</strong>
                        <span>{interview.interviewer?.name || "Unknown"}</span>

                        {interview.interviewer?.email && (
                            <>
                                <strong className="muted">Email:</strong>
                                <span>{interview.interviewer.email}</span>
                            </>
                        )}

                        <strong className="muted">Rating:</strong>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {interview.ratingAverage > 0 ? (
                                <>
                                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>★ {interview.ratingAverage.toFixed(1)}</span>
                                    <span className="muted small">({interview.totalReviews} reviews)</span>
                                </>
                            ) : (
                                <span className="muted">No ratings yet</span>
                            )}
                        </span>
                    </div>
                </div>

                {user?.role === "interviewee" ? (
                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                        <h3 style={{ marginTop: 0 }}>Book This Interview</h3>
                        <div className="input-group" style={{ maxWidth: '400px' }}>
                            <label>Select Date & Time</label>
                            <input
                                type="datetime-local"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleBook} disabled={!selectedDate} style={{ marginTop: '1rem', padding: '0.8rem 2rem' }}>
                            Confirm Booking
                        </button>
                    </div>
                ) : (
                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                        You must be an interviewee to book this interview. If you are an interviewer, you cannot book your own interview.
                    </div>
                )}
            </div>
        </div>
    );
}
