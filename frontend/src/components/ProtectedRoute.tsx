import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface ProtectedRouteProps {
  children?: React.ReactNode; // Allow children to be passed if needed, but Outlet is preferred
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    // Using replace to avoid adding login page to history stack
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child route component (via Outlet) or children
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 