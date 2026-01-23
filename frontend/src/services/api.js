import axios from 'axios';

// COMMENT OUT THE VARIABLE LINE:
// const API_URL = import.meta.env.VITE_API_URL;

// HARDCODE THE HTTPS URL DIRECTLY:
const API_URL = "https://internshipassignment-production.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
