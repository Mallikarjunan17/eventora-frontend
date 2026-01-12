import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";
import AdminEvents from "./pages/AdminEvents";
import AdminEditEvent from "./pages/AdminEditEvent";
import AdminCreateEvent from "./pages/AdminCreateEvent";
import Contact from "./pages/Contact";

import AdminRoute from "./components/AdminRoute";

export default function App() {
  // ✅ Load user from localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      {/* ✅ PASS user + setUser */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- USER ---------- */}
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* ---------- ADMIN ---------- */}
        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events/create"
          element={
            <AdminRoute>
              <AdminCreateEvent />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events/edit/:id"
          element={
            <AdminRoute>
              <AdminEditEvent />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
