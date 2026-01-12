import { useEffect, useState } from "react";
import { backendAPI } from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    backendAPI
      .get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "120px", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <section className="my-bookings-page">
      <div className="my-bookings-overlay">
        <h1 className="my-bookings-title">My Bookings</h1>
        <p className="my-bookings-subtitle">
          Your confirmed premium event reservations
        </p>

        {bookings.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No bookings found.
          </p>
        ) : (
          <div className="bookings-grid">
            {bookings.map(booking => (
              <div key={booking._id} className="booking-card">
                <h2>{booking.eventTitle}</h2>

                <div className="booking-meta">
                  <span>📅 {booking.eventDate}</span>
                  <span>💰 ₹{booking.price}</span>
                </div>

                <div className="booking-status">
                  Status: <strong>{booking.status}</strong>
                </div>

                <p className="booking-time">
                  Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
