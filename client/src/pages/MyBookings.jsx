import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.get("/users/my-bookings");
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🔥 Cancel booking
  const handleCancel = async (bookingId) => {
    try {
      await api.put(`/interviews/cancel/${bookingId}`);

      // Update state without reload
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  if (loading) {
    return <div className="p-40">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="card mb-14">
            <h3>{booking.interview?.title}</h3>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.scheduledAt).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-${booking.status}`}>{booking.status}</span>
            </p>

            {/* Allow cancel only if pending */}
            {booking.status === "pending" && (
              <button className="btn mt-10" onClick={() => handleCancel(booking._id)}>Cancel Booking</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}