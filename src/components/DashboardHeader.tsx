
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Settings, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  showCreateButton?: boolean;
}

const DashboardHeader = ({ 
  title, 
  description,
  showCreateButton = true 
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gray-800">{title}</h1>
          {description && (
            <p className="mt-1 text-gray-600">{description}</p>
          )}
        </div>
        
        {showCreateButton && (
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/templates')}
              className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white flex items-center gap-2 shadow-sm hover:shadow transition-all duration-300"
            >
              <Plus size={18} />
              <span>Buat Undangan</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-wedding-champagne">
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-sm border border-wedding-champagne/50">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-wedding-light-blush"
                  onClick={() => navigate('/account')}
                >
                  <Settings size={16} className="mr-2" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-wedding-champagne/30" />
                <DropdownMenuItem className="cursor-pointer hover:bg-wedding-light-blush">
                  <Heart size={16} className="mr-2" />
                  <span>Favorit</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
