import axios from 'axios';

// 🛑 STOP using the variable for now. 
// ✅ WE ARE HARDCODING HTTPS DIRECTLY:
const API_URL = "https://internshipassignment-production.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token (if you use one)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
