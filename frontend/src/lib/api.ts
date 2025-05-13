import axios from 'axios';
import useAuthStore from '../store/authStore'; // Import the auth store

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'; // Use import.meta.env for Vite

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    // Get token from the Zustand store
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle 401 errors (e.g., token expired)
apiClient.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired
      console.log('API request unauthorized (401). Logging out.');
      // Call logout action from the store
      useAuthStore.getState().logout();
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

 