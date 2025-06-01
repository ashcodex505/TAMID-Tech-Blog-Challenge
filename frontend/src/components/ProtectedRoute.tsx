import React from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuth } from '../context/auth/authProvider';

interface ProtectedRouteProps {
  children?: React.ReactNode; // Allow children to be passed if needed, but Outlet is preferred
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If no session, redirect to login
  if (!session) {
    // Save the attempted URL for redirecting back after login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child route component (via Outlet) or children
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 
