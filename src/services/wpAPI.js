import axios from "axios";

/**
 * Public WordPress API
 * - Used by users
 * - No authentication
 * - Read-only
 */

const wpAPI = axios.create({
  baseURL: "http://localhost:8000/wp-json/wp/v2"
});

export default wpAPI;
