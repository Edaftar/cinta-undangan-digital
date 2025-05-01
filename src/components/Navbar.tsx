import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { Menu, X, LayoutDashboard, User, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil keluar");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Gagal keluar");
    }
  };

  const userMenuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      label: "Akun Saya",
      href: "/account",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      label: "Profil",
      href: "/profile",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      label: "Keluar",
      onClick: handleLogout,
      icon: <LogOut className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="bg-wedding-ivory border-b border-wedding-champagne">
      <div className="container max-w-6xl py-4 px-4 lg:px-0 mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-800 font-playfair">
          Wedding Invitation
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-800 ${isActive ? "font-semibold" : ""}`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-800 ${isActive ? "font-semibold" : ""}`
            }
          >
            Template
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-800 ${isActive ? "font-semibold" : ""}`
            }
          >
            Tentang Kami
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-800 ${isActive ? "font-semibold" : ""}`
            }
          >
            Harga
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-800 ${isActive ? "font-semibold" : ""}`
            }
          >
            Blog
          </NavLink>
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.full_name || "Profile"} />
                  <AvatarFallback className="bg-wedding-sage text-white">
                    {user.user_metadata?.full_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {userMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.label === "Keluar" ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={item.onClick} className="cursor-pointer">
                        {item.icon}
                        {item.label}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link to={item.href}>
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/auth/login" className="text-gray-600 hover:text-gray-800">
              Masuk
            </Link>
            <Link
              to="/auth/signup"
              className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white py-2 px-4 rounded-md transition-colors"
            >
              Daftar
            </Link>
          </div>
        )}

        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Button variant="ghost" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:w-2/3 md:w-1/2">
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Explore and navigate through our options.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <NavLink to="/" className="block text-gray-600 hover:text-gray-800 py-2">
                Beranda
              </NavLink>
              <NavLink to="/templates" className="block text-gray-600 hover:text-gray-800 py-2">
                Template
              </NavLink>
              <NavLink to="/about" className="block text-gray-600 hover:text-gray-800 py-2">
                Tentang Kami
              </NavLink>
              <NavLink to="/pricing" className="block text-gray-600 hover:text-gray-800 py-2">
                Harga
              </NavLink>
              <NavLink to="/blog" className="block text-gray-600 hover:text-gray-800 py-2">
                Blog
              </NavLink>
              {user ? (
                <>
                  {userMenuItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.label === "Keluar" ? (
                        <Button variant="ghost" className="w-full justify-start" onClick={item.onClick}>
                          {item.icon}
                          {item.label}
                        </Button>
                      ) : (
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="block text-gray-600 hover:text-gray-800 py-2">
                    Masuk
                  </Link>
                  <Link to="/auth/signup" className="block bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white py-2 px-4 rounded-md transition-colors">
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
