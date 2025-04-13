
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin, checkingAdmin } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication or admin status
  if (isLoading || (adminOnly && checkingAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wedding-rosegold"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Redirect if not admin but trying to access admin pages
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
