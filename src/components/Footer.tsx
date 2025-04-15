
import { Heart, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wedding-light-sage py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              UntukSelamaNya <Heart size={16} className="ml-1 text-wedding-rosegold" />
            </h3>
            <p className="text-sm text-gray-600">
              Buat undangan pernikahan digitalmu dengan mudah dan cepat.
              Personalisasikan sesuai keinginanmu dan bagikan kepada semua tamu.
            </p>
            <div className="flex space-x-3 pt-3">
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Instagram size={18} className="text-wedding-rosegold" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Facebook size={18} className="text-wedding-rosegold" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Mail size={18} className="text-wedding-rosegold" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Templates</h3>
            <ul className="space-y-2">
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Elegant</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Minimalist</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Rustic</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Traditional</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Modern</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Islamic</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-wedding-rosegold transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Blog</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-wedding-rosegold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-wedding-rosegold" />
                <span className="text-gray-600">+62 123 4567 890</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-wedding-rosegold" />
                <span className="text-gray-600">hello@untukselamanya.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} UntukSelamaNya Wedding Invitation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
