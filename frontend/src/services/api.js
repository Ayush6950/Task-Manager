import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
// Interceptors = An HTTP Interceptor is a middleware function that sits between your client application and the server.
//  It intercepts outgoing HTTP requests to attach data (like auth tokens) and processes 
// incoming responses (for error handling) globally, without needing manual configuration for every single API call.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;  