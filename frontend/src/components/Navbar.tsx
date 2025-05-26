import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth/authProvider';
import { supabase } from '../context/auth/supabaseClient';
import { motion } from 'framer-motion';
import { Home, FileText, PenSquare, LogOut, LogIn, UserPlus, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check if a path is active
  const isActive = (path: string) => location.pathname === path;

  // Show loading state if auth is still loading
  if (loading) {
    return (
      <nav className="bg-[#2A2A2A] text-white p-4 shadow-md border-b border-[#444444]">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center group">
            <span className="text-white group-hover:text-[#31B4EF] transition-colors">Tech</span>
            <span className="text-[#31B4EF]">Blog</span>
          </Link>
          <div className="text-gray-400">Loading...</div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="bg-[#2A2A2A] text-white p-4 shadow-md border-b border-[#444444]"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center group">
          <span className="text-white group-hover:text-[#31B4EF] transition-colors">Tech</span>
          <span className="text-[#31B4EF]">Blog</span>
        </Link>
        <div className="flex items-center space-x-5">
          <Link 
            to="/" 
            className={`flex items-center hover:text-[#31B4EF] transition-colors ${isActive('/') ? 'text-[#31B4EF]' : 'text-gray-300'}`}
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {session ? (
            <>
              <Link 
                to="/my-posts" 
                className={`flex items-center hover:text-[#31B4EF] transition-colors ${isActive('/my-posts') ? 'text-[#31B4EF]' : 'text-gray-300'}`}
              >
                <FileText className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">My Posts</span>
              </Link>
              
              <Link 
                to="/create-post" 
                className={`flex items-center hover:text-[#31B4EF] transition-colors ${isActive('/create-post') ? 'text-[#31B4EF]' : 'text-gray-300'}`}
              >
                <PenSquare className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Create</span>
              </Link>
              
              <div className="flex items-center border-l border-[#444444] pl-4 ml-1">
                <User className="w-4 h-4 text-[#31B4EF] mr-2" />
                <span className="text-gray-300 text-sm mr-3">
                  {session.user?.user_metadata?.full_name || session.user?.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-[#333333] hover:bg-[#444444] text-white font-medium py-1 px-3 rounded-md text-sm flex items-center"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`flex items-center hover:text-[#31B4EF] transition-colors ${isActive('/login') ? 'text-[#31B4EF]' : 'text-gray-300'}`}
              >
                <LogIn className="w-4 h-4 mr-1" />
                <span>Login</span>
              </Link>
              
              <Link 
                to="/register" 
                className={`flex items-center hover:text-[#31B4EF] transition-colors ${isActive('/register') ? 'text-[#31B4EF]' : 'text-gray-300'}`}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 