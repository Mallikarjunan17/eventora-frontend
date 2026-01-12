import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
import { formatACFDate } from "../utils/date";
export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/wp-json/wp/v2/events/${id}?_embed`)
      .then(res => setEvent(res.data));
  }, [id]);

  if (!event) return null;

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to book");

    await axios.post(
      "http://localhost:5001/api/bookings",
      {
        eventId: event.id,
        eventTitle: event.title.rendered,
        eventDate: event.acf?.event_date || "TBA",
        price: event.acf?.price || 0
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Booking successful");
  };

  return (
    <div className="event-details-page">
      <div className="event-hero">
        <div className="event-hero-overlay">
          <h1 dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
        </div>
      </div>

      <div className="event-container">
        <div
          className="event-description"
          dangerouslySetInnerHTML={{ __html: event.content.rendered }}
        />

        <aside className="event-sidebar">
          <div className="event-card">
            <h3>Event Details</h3>
            {event.acf?.event_date && (
            <p>
             📅 <strong>Date:</strong> {formatACFDate(event.acf.event_date)}
              </p>)}            
              <p>📍 {event.acf?.location || "TBA"}</p>
            <p>💰 ₹{event.acf?.price || "Free"}</p>

            <button className="book-now-btn" onClick={handleBook}>
              Book Now
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
