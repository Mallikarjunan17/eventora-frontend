import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminCreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* IMAGE PREVIEW */
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* UPLOAD IMAGE TO WORDPRESS */
  const uploadImageToWordPress = async (file, postId) => {
    const WP_USERNAME = "eventora_admin";
    const WP_APP_PASSWORD = "QB0mgRc7Om0yJiUMddwx7xVn";

    const authHeader = btoa(`${WP_USERNAME}:${WP_APP_PASSWORD}`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("post", postId);

    const res = await axios.post(
      "http://localhost:8000/wp-json/wp/v2/media",
      formData,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    return res.data.id;
  };

  /* CREATE EVENT */
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create event
      const createRes = await axios.post(
        "http://localhost:5001/api/wp/events",
        {
          title,
          content,
          status: "publish",
          acf: {
            location,
            event_date: eventDate,
            price,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const eventId = createRes.data.id;

      // 2️⃣ Upload image & attach
      if (image) {
        const mediaId = await uploadImageToWordPress(image, eventId);

        await axios.put(
          `http://localhost:5001/api/wp/events/${eventId}`,
          { featured_media: mediaId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("✅ Event created successfully");
      navigate("/admin/events");
    } catch (err) {
      console.error("CREATE FAILED:", err.response?.data || err.message);
      alert("❌ Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  /* UI */
  return (
    <div className="admin-page">
      <div className="admin-form-card">
        <h1>Create New Event</h1>
        <p className="subtitle">Add a new event for users to discover</p>

        {/* ✅ FIXED HERE */}
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the event"
              rows="5"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Event location"
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0 for free"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Banner</label>
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
              />
              {preview && <img src={preview} alt="preview" />}
            </div>
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
