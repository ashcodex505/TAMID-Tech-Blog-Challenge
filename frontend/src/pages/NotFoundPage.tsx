import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#202020] text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 text-center flex flex-col items-center justify-center max-w-md"
      >
        <motion.div 
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            duration: 0.5,
            delay: 0.2
          }}
          className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#444444] w-full"
        >
          <AlertTriangle className="w-16 h-16 text-[#31B4EF] mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-[#31B4EF] mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found.</h2>
          <p className="text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-3 px-6 rounded-md text-lg inline-flex items-center transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage; 