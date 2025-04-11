
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-dancing font-bold text-wedding-purple">Cinta</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-wedding-purple transition-colors">
            Home
          </Link>
          <Link to="/templates" className="font-medium hover:text-wedding-purple transition-colors">
            Templates
          </Link>
          <Link to="/pricing" className="font-medium hover:text-wedding-purple transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="font-medium hover:text-wedding-purple transition-colors">
            About
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hover:text-wedding-purple transition-colors">
              Login
            </Button>
            <Button className="bg-wedding-purple hover:bg-wedding-deep-purple text-white">
              Sign Up
            </Button>
          </div>
        </div>
        
        <button 
          className="md:hidden text-gray-600 hover:text-wedding-purple"
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
              className="py-2 hover:bg-wedding-bg-light px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="py-2 hover:bg-wedding-bg-light px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="py-2 hover:bg-wedding-bg-light px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="py-2 hover:bg-wedding-bg-light px-3 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button variant="ghost" className="justify-start" onClick={() => setIsMenuOpen(false)}>
                Login
              </Button>
              <Button 
                className="bg-wedding-purple hover:bg-wedding-deep-purple text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
