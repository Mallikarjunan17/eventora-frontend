import axios from "axios";

/* =========================
   WORDPRESS API (READ ONLY)
========================= */
export const wpAPI = axios.create({
  baseURL: "http://localhost:8000/wp-json/wp/v2"
});

/* =========================
   BACKEND API (AUTH / BOOKINGS / ADMIN)
========================= */
export const backendAPI = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json"
  }
});

backendAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
