import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminEditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH EVENT
  ========================= */
  useEffect(() => {
    axios
      .get(`http://localhost:8000/wp-json/wp/v2/events/${id}?_embed`)
      .then((res) => {
        const e = res.data;

        setTitle(e.title?.rendered || "");
        setContent(e.content?.rendered || "");
        setLocation(e.acf?.location || "");
        setEventDate(e.acf?.event_date || "");
        setPrice(e.acf?.price || "");

        const img =
          e._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        if (img) setPreview(img);
      })
      .catch(console.error);
  }, [id]);

  /* IMAGE */
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* UPLOAD IMAGE */
  const uploadImageToWordPress = async (file, eventId) => {
    const authHeader = btoa(
      "eventora_admin:QB0mgRc7Om0yJiUMddwx7xVn"
    );

    const formData = new FormData();
    formData.append("file", file);
    formData.append("post", eventId);

    const res = await axios.post(
      "http://localhost:8000/wp-json/wp/v2/media",
      formData,
      { headers: { Authorization: `Basic ${authHeader}` } }
    );

    return res.data.id;
  };

  /* UPDATE */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      let mediaId = null;

      if (image) {
        mediaId = await uploadImageToWordPress(image, id);
      }

      await axios.put(
        `http://localhost:5001/api/wp/events/${id}`,
        {
          title,
          content,
          acf: {
            location,
            event_date: eventDate,
            price
          },
          ...(mediaId && { featured_media: mediaId })
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Event updated");
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* UI */
  return (
    <div className="admin-page">
      <div className="admin-form-card">
        <h1>Edit Event</h1>
        <p className="subtitle">
          Update event details & banner image
        </p>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Banner</label>
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImage(e.target.files[0])
                }
              />
              {preview && <img src={preview} alt="preview" />}
            </div>
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
