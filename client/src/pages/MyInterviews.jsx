import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function MyInterviews() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH MY INTERVIEWS
  =============================== */
  useEffect(() => {
    const fetchMyInterviews = async () => {
      try {
        const data = await api.get("/interviews/my-interviews");
        setInterviews(data);
      } catch (error) {
        console.error("Failed to fetch interviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInterviews();
  }, []);

  /* ===============================
     UPDATE BOOKING STATUS
  =============================== */
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await api.put(`/interviews/booking/${bookingId}`, { status });

      // Update state without reload
      setInterviews((prev) =>
        prev.map((interview) => ({
          ...interview,
          bookings: interview.bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status }
              : booking
          )
        }))
      );
    } catch (error) {
      alert("Failed to update booking");
    }
  };

  /* ===============================
     DELETE INTERVIEW
  =============================== */
  const handleDeleteInterview = async (interviewId) => {
    try {
      await api.delete(`/interviews/${interviewId}`);

      setInterviews((prev) =>
        prev.filter((interview) => interview._id !== interviewId)
      );
    } catch (error) {
      alert("Failed to delete interview");
    }
  };

  /* ===============================
     ROLE PROTECTION
  =============================== */
  if (user?.role !== "interviewer") {
    return <h2 className="p-40">Access Denied</h2>;
  }

  if (loading) {
    return <h2 className="p-40">Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>My Interviews</h1>

      {interviews.length === 0 ? (
        <p>No interviews created yet.</p>
      ) : (
        interviews.map((interview) => (
          <div key={interview._id} className="card mb-18">
            <h3>{interview.title}</h3>
            <p>{interview.description}</p>
            <p>Duration: {interview.duration} mins</p>
            <p>Price: ₹{interview.price}</p>

            <button
              onClick={() => handleDeleteInterview(interview._id)}
              className="btn btn-danger mb-12"
            >
              Delete Interview
            </button>

            <h4>Bookings:</h4>

            {interview.bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              interview.bookings.map((booking) => (
                <div key={booking._id} className="card-item border-top-light pt-10 mt-10">
                  <p>
                    <strong>User:</strong> {booking.user.name}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.scheduledAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-${booking.status}`}>{booking.status}</span>
                  </p>

                  {booking.status === "pending" && (
                    <>
                      <button className="btn" onClick={() => handleStatusUpdate(booking._id, "confirmed")}>Confirm</button>

                      <button className="btn ml-10" onClick={() => handleStatusUpdate(booking._id, "rejected")}>Reject</button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
}