
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
      console.log("Admin access denied. User lacks admin privileges.");
    }
  }, [adminOnly, user, isAdmin, checkingAdmin]);

  // For debugging
  useEffect(() => {
    if (adminOnly) {
      console.log("ProtectedRoute (adminOnly) - Auth state:", { 
        user: !!user, 
        isAdmin, 
        checkingAdmin,
        isLoading
      });
    }
  }, [adminOnly, user, isAdmin, checkingAdmin, isLoading]);

  // Show loading state while checking authentication or admin status
  if (isLoading || (adminOnly && checkingAdmin)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-ivory">
        <Loader2 className="h-12 w-12 animate-spin text-wedding-rosegold mb-4" />
        <p className="text-gray-600">
          {isLoading ? "Memeriksa autentikasi..." : "Memeriksa hak akses admin..."}
        </p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Only check admin status if the route requires admin privileges
  if (adminOnly && !isAdmin) {
    console.error("Admin access denied. isAdmin:", isAdmin);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
