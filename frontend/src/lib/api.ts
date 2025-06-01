import axios from 'axios';
import { supabase } from '../context/auth/supabaseClient';

// Get the API base URL with better production handling
const getApiBaseUrl = () => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // In production, use absolute URL (replace with your actual backend URL)
  if (import.meta.env.PROD) {
    return 'https://tamid-tech-blog-backend-challenge.vercel.app/api';
  }
  
  // Development fallback
  return 'http://localhost:5001/api';
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Supabase JWT token to requests if available
apiClient.interceptors.request.use(
  async (config) => {
    // Get current session from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired, sign out user
      console.log('API request unauthorized (401). Signing out.');
      await supabase.auth.signOut();
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

 