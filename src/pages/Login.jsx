import { useState } from "react";
import { backendAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await backendAPI.post("/auth/login", {
        email: email.trim(),
        password
      });

      // ✅ SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ UPDATE APP STATE (THIS FIXES NAVBAR ☰)
      setUser(res.data.user);

      // ✅ REDIRECT
      if (res.data.user.role === "admin") {
        navigate("/admin/bookings");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>{isAdmin ? "Admin Login" : "User Login"}</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="auth-toggle"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? "Login as User" : "Login as Admin"}
        </p>
      </div>
    </section>
  );
}
