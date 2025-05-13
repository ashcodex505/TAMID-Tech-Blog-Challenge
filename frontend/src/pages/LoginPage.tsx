import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/'); // Redirect to home on successful login
    } catch (err) {
      // Error is handled in the store, but we catch here to prevent unhandled rejection
      console.error("Login failed in component");
      // Optionally show error feedback to user if not done globally
    }
  };

  return (
    <div className="min-h-screen bg-[#202020] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#444444]"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#31B4EF]/10 mb-4"
          >
            <LogIn className="h-8 w-8 text-[#31B4EF]" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue to TechBlog</p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md mb-6"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center" htmlFor="email">
              <Mail className="w-4 h-4 mr-2 text-[#31B4EF]" />
              Email Address
            </label>
            <input
              className="w-full bg-[#333333] border border-[#444444] rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B4EF] focus:border-transparent transition-all"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center" htmlFor="password">
              <Lock className="w-4 h-4 mr-2 text-[#31B4EF]" />
              Password
            </label>
            <input
              className="w-full bg-[#333333] border border-[#444444] rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B4EF] focus:border-transparent transition-all"
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-2 px-4 rounded-md focus:outline-none transition-all duration-200 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
            <div className="text-center">
              <Link 
                to="/register" 
                className="text-[#31B4EF] hover:text-[#31B4EF]/80 text-sm font-medium transition-colors"
              >
                Don't have an account? Register
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage; 