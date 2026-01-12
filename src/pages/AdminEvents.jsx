import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatACFDate } from "../utils/date";
export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/events?_embed")
      .then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5001/api/wp/events/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Manage Events</h2>
        <Link to="/admin/events/create" className="create-btn">
          + Create Event
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map(e => (
            <tr key={e.id}>
              <td>{e.title.rendered}</td>
              <td>{e.acf?.location || "—"}</td>
               <td>{formatACFDate(e.acf?.event_date)}</td>
              <td>₹{e.acf?.price ?? "0"}</td>
              <td className="actions">
                <Link to={`/admin/events/edit/${e.id}`}>
                  <FaEdit className="edit-icon" />
                </Link>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(e.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
