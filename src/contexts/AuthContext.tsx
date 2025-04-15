
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  checkingAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const navigate = useNavigate();

  // Function to check if user is admin
  const checkAdminStatus = async (userId: string) => {
    try {
      setCheckingAdmin(true);
      console.log("Checking admin status for user:", userId);
      
      // Call the is_admin function
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin status:", error);
        toast.error("Admin check failed: " + error.message);
        setIsAdmin(false);
      } else {
        console.log("Admin check result:", data);
        setIsAdmin(!!data);
        
        // If user is admin and is on login page, redirect to admin panel
        if (!!data && window.location.pathname.includes('/auth/login')) {
          navigate('/admin');
        }
      }
      
      setCheckingAdmin(false);
    } catch (error: any) {
      console.error("Error checking admin role:", error);
      toast.error("Admin check failed: " + error.message);
      setIsAdmin(false);
      setCheckingAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check admin status if user exists
        if (currentSession?.user) {
          await checkAdminStatus(currentSession.user.id);
        } else {
          setIsAdmin(false);
          setCheckingAdmin(false);
        }

        // Redirect based on authentication status
        if (currentSession?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            if (isAdmin) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 100);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check admin status if user exists
      if (currentSession?.user) {
        await checkAdminStatus(currentSession.user.id);
      } else {
        setIsAdmin(false);
        setCheckingAdmin(false);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Login berhasil!");
      
      // Redirect will be handled by the auth state change listener
    } catch (error: any) {
      toast.error(error.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) throw error;
      
      toast.success("Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message || "Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear state after successful logout
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      toast.success("Berhasil keluar!");
      navigate("/");
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error(error.message || "Gagal keluar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        checkingAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
