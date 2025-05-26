import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/auth/authProvider';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (session && !loading) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  // If still loading, show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-[#202020] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31B4EF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202020] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#444444] text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#31B4EF]/10 mb-6"
        >
          <UserPlus className="h-8 w-8 text-[#31B4EF]" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Join TechBlog</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Welcome to our community! We use Google authentication to provide a secure and seamless experience.
        </p>
        
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/login"
              className="w-full bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-3 px-4 rounded-md focus:outline-none transition-all duration-200 flex items-center justify-center group"
            >
              Continue with Google
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-[#31B4EF] hover:text-[#31B4EF]/80 text-sm font-medium transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#444444]">
          <p className="text-gray-500 text-xs">
            By continuing, you agree to our terms of service and privacy policy
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage; 