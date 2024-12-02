import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7064/api",
  headers: {
    Accept: "*/*",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
