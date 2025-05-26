import axios from 'axios';
import { supabase } from '../context/auth/supabaseClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'; // Use import.meta.env for Vite

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

 