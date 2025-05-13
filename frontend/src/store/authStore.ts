import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import apiClient from '../lib/api'; // Import the api client

// Define the shape of the user object (consistent with backend response)
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  // TODO: Add function to fetch user profile (getMe)
}

// Define the Zustand store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
          const { user, token } = response.data;
          set({ user, token, isAuthenticated: true, isLoading: false, error: null });
          // Optionally set token in Axios headers globally if not using interceptor
          // apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err: any) {
          const errorMessage = err.response?.data?.message || 'Login failed';
          console.error('Login error:', err.response?.data);
          set({ error: errorMessage, isLoading: false, user: null, token: null, isAuthenticated: false });
          throw new Error(errorMessage); // Re-throw to handle in component
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<{ user: User; token: string }>('/auth/register', userData);
          const { user, token } = response.data;
          set({ user, token, isAuthenticated: true, isLoading: false, error: null });
          // Optionally set token in Axios headers
          // apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err: any) {
          const errorMessage = err.response?.data?.message || 'Registration failed';
          console.error('Register error:', err.response?.data);
          set({ error: errorMessage, isLoading: false, user: null, token: null, isAuthenticated: false });
           throw new Error(errorMessage); // Re-throw to handle in component
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
        // Remove token from Axios headers if set globally
        // delete apiClient.defaults.headers.common['Authorization'];
      },

      // TODO: Implement getMe function to verify token/fetch user on app load
    }),
    {
      name: 'auth-storage', // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }), // Only persist user, token, and auth status
    }
  )
);

// Selector to easily check authentication status
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

export default useAuthStore; 