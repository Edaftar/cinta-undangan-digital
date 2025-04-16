
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin, checkingAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Show toast if user is trying to access admin-only route but is not admin
    if (adminOnly && user && !isAdmin && !checkingAdmin) {
      toast.error("Anda tidak memiliki akses ke halaman ini");
    }
  }, [adminOnly, user, isAdmin, checkingAdmin]);

  // Show loading state while checking authentication or admin status
  if (isLoading || (adminOnly && user && checkingAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wedding-rosegold"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Only check admin status if the route requires admin privileges
  if (adminOnly && !isAdmin) {
    console.log("Admin access denied. isAdmin:", isAdmin);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
