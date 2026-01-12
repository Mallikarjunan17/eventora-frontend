import { useEffect, useState } from "react";
import { backendAPI } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    backendAPI.get("/wp/events?_embed").then(res => {
      setEvents(res.data);
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Eventora Collective</h1>
          <p>
            Crafting luxury events, unforgettable experiences,
            <br /> and premium celebrations
          </p>
          <a href="#events" className="hero-btn">Explore Events</a>
        </div>
      </section>

      {/* EVENTS */}
      {/* EVENTS SECTION */}
<section className="events-section">
  <div className="events-overlay">
    <h2 className="events-title">Our Signature Events</h2>
    <p className="events-subtitle">
      Curated experiences crafted with elegance & excellence
    </p>

    <div id="events" className="events-grid">
      {events.map(event => {
        const image =
          event._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        return (
          <div key={event.id} className="event-card">
            {image && (
              <img
                src={image}
                alt={event.title.rendered}
                className="event-image"
              />
            )}

            <div className="event-content">
              <h2>{event.title.rendered}</h2>

              <p
                className="event-desc"
                dangerouslySetInnerHTML={{
                  __html:
                    event.content.rendered.substring(0, 120) + "..."
                }}
              />

              <div className="event-meta">
                <span>📍 {event.acf?.location}</span>
                <span>📅 {event.acf?.event_date}</span>
                <span>💰 ₹{event.acf?.price}</span>
              </div>

              <Link to={`/event/${event.id}`} className="event-btn">
                View Details →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

    </>
  );
}
