
import { Card, CardContent } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  ExternalLink, 
  Edit, 
  Copy, 
  Trash2,
  Heart,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InvitationCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  templateName: string;
  slug: string;
}

const InvitationCard = ({
  id,
  title,
  date,
  location,
  image,
  templateName,
  slug,
}: InvitationCardProps) => {
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/invitation/${slug}`);
    toast.success("Link berhasil disalin!");
  };
  
  const handleDelete = () => {
    // This would normally delete the invitation, but for now we'll just show a toast
    toast.success("Undangan berhasil dihapus!");
  };
  
  return (
    <Card className="overflow-hidden border border-wedding-champagne/30 transition-all duration-300 hover:shadow-md group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white/80 hover:bg-white text-gray-800"
              asChild
            >
              <Link to={`/preview/${id}`}>
                <ExternalLink size={16} className="mr-1" />
                Preview
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
              asChild
            >
              <Link to={`/create/${id}`}>
                <Edit size={16} className="mr-1" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
        
        <img 
          src={image || "/placeholder.svg"} 
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700 rounded-full">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white/90 backdrop-blur-sm border border-wedding-champagne/50">
              <DropdownMenuItem className="cursor-pointer hover:bg-wedding-light-blush" onClick={handleCopyLink}>
                <Copy size={16} className="mr-2" />
                <span>Salin Link</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-wedding-light-blush">
                <Share2 size={16} className="mr-2" />
                <span>Bagikan</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-wedding-light-blush">
                <Heart size={16} className="mr-2" />
                <span>Favorit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-wedding-champagne/30" />
              <DropdownMenuItem className="cursor-pointer hover:bg-rose-50 text-rose-600" onClick={handleDelete}>
                <Trash2 size={16} className="mr-2" />
                <span>Hapus</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-white/80 text-xs font-medium rounded-full text-gray-800">
            {templateName}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-great-vibes text-xl text-wedding-deep-rosegold mb-1">{title}</h3>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{date}</p>
          <p className="text-xs text-gray-500 truncate">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
