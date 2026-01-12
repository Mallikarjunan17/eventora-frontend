import { useEffect, useState } from "react";
import axios from "axios";
import { formatACFDate } from "../utils/date";
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5001/api/bookings/admin/all", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));
  }, []);

  return (
    <div className="admin-container">
      <h2>All Bookings</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Event</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.userId?.email || "—"}</td>
              <td>{b.eventTitle}</td>
              <td>{formatACFDate(b.eventDate)}</td>
              <td>₹{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
