import axios from "axios";

const wpAdminAPI = axios.create({
  baseURL: "http://localhost:8000/wp-json/wp/v2",
  headers: {
    Authorization:
      "Basic ZXZlbnRvcmFfYWRtaW46YVlpZCAyTU9TIHZGRTUgOXBrMiAxcjBhIFZla1A="
  }
});

export default wpAdminAPI;
