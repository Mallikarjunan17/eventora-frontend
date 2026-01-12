import { useState } from "react";
import { backendAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await backendAPI.post("/auth/register", {
        name,
        email,
        password,
        role: isAdmin ? "admin" : "user"
      });

      alert("Registered successfully");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>{isAdmin ? "Admin Register" : "User Register"}</h1>

        <input
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p className="auth-toggle" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin
            ? "Register as User"
            : "Register as Admin"}
        </p>
      </div>
    </section>
  );
}
