import axios from "axios";

const WP_MEDIA_URL = "http://localhost:8000/wp-json/wp/v2/media";

export async function uploadImageToWP(file) {
  const token = localStorage.getItem("wp_token");

  if (!file) throw new Error("No file selected");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(WP_MEDIA_URL, formData, {
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Disposition": `attachment; filename="${file.name}"`
    }
  });

  // WordPress returns media object
  return response.data.id;
}
