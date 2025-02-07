import axios from "axios";

const api = axios.create({
  // baseURL: "http://speed.rekikartgallery.com/api/",
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Add CSRF token to every request header
api.interceptors.request.use((config) => {
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

export default api;
