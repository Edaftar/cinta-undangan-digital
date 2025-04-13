
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(adminOnly);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();
          
        if (data && !error) {
          setIsAdmin(true);
        }
        setCheckingAdmin(false);
      } catch (error) {
        console.error("Error checking admin role:", error);
        setCheckingAdmin(false);
      }
    };
    
    if (user && adminOnly) {
      checkAdminRole();
    } else if (!adminOnly) {
      setCheckingAdmin(false);
    }
  }, [user, adminOnly]);

  // Show loading state while checking authentication
  if (isLoading || checkingAdmin) {
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
