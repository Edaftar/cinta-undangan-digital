
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is admin
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
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };
    
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Berhasil keluar!");
      navigate('/');
    } catch (error) {
      toast.error("Gagal keluar. Silakan coba lagi.");
    }
  };

  return (
    <nav className="bg-wedding-ivory shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-dancing font-bold text-wedding-rosegold">UntukSelamaNya</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-wedding-rosegold transition-colors">
            Home
          </Link>
          <Link to="/templates" className="font-medium hover:text-wedding-rosegold transition-colors">
            Templates
          </Link>
          <Link to="/pricing" className="font-medium hover:text-wedding-rosegold transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="font-medium hover:text-wedding-rosegold transition-colors">
            About
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:text-wedding-rosegold">
                    <User size={18} />
                    <span className="hidden sm:inline">{user.user_metadata.first_name || "Akun Saya"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <DropdownMenuLabel className="text-sm font-medium text-wedding-rosegold">
                      Admin
                    </DropdownMenuLabel>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer flex items-center gap-2 w-full">
                      <User size={16} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer flex items-center gap-2 w-full">
                        <Settings size={16} />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
                    <LogOut size={16} className="mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:text-wedding-rosegold transition-colors" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white" asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        
        <button 
          className="md:hidden text-gray-600 hover:text-wedding-rosegold"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="border-t pt-2">
              {user ? (
                <div className="flex flex-col space-y-2">
                  {isAdmin && (
                    <div className="text-sm font-medium text-wedding-rosegold px-3 py-1">
                      Admin
                    </div>
                  )}
                  <Link
                    to="/dashboard"
                    className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} />
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 text-left text-red-500 hover:bg-red-50 px-3 rounded-md transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="block py-2 hover:bg-wedding-light-blush px-3 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block py-2 bg-wedding-rosegold text-white hover:bg-wedding-deep-rosegold px-3 rounded-md transition-colors mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
