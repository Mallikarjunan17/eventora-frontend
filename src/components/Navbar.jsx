import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Eventora</Link>

      <div className="nav-right">
        {user ? (
          <div className="user-menu">
            <span className="welcome-text">Hi, {user.name}</span>

            <button
              className="menu-btn"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            {open && (
              <div className="dropdown">
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
               

                {user.role === "admin" && (
                  <>
                    <Link to="/admin/events" onClick={() => setOpen(false)}>
                      Manage Events
                    </Link>
                    <Link to="/admin/events/create" onClick={() => setOpen(false)}>
                      Create Event
                    </Link>
                    <Link to="/admin/bookings" onClick={() => setOpen(false)}>
                      Bookings
                    </Link>
                     <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                  </>
                )}

                {user.role === "user" && (
                  <Link to="/my-bookings" onClick={() => setOpen(false)}>
                    My Bookings
                  </Link>
                  
                )}

                <hr />
                <button onClick={logout} className="logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
