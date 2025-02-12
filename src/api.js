import axios from "axios";

const api = axios.create({
  // baseURL: "https://speedmeter.rekikartgallery.com/api/",
  // baseURL: "https://gwg.rekikartgallery.com/api/",
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "https://speedmetergms.com/api/",
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
