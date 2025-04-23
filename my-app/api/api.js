// src/api/api.client.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ for frontend
});

export default API;
