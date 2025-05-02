
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "@/components/DashboardHeader";
import InvitationCard from "@/components/InvitationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin } from "lucide-react";

// Mock data for invitation cards
const mockInvitations = [
  {
    id: "1",
    title: "Ratna & Budi",
    date: "17 Agustus 2025",
    location: "Taman Sari, Yogyakarta",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
    templateName: "Modern Geometry",
    slug: "ratna-budi"
  },
  {
    id: "2",
    title: "Siti & Ahmad",
    date: "25 September 2025",
    location: "Grand Hyatt, Jakarta",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    templateName: "Rustic",
    slug: "siti-ahmad"
  },
  {
    id: "3",
    title: "Maya & Doni",
    date: "12 Oktober 2025",
    location: "The Westin, Bali",
    image: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&q=80",
    templateName: "Elegant Rose",
    slug: "maya-doni"
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter invitations based on search query
  const filteredInvitations = mockInvitations.filter((invitation) => 
    invitation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invitation.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
        <DashboardHeader 
          title="Dashboard Saya" 
          description={`Selamat datang${user?.user_metadata?.first_name ? ', ' + user.user_metadata.first_name : ''}! Kelola undangan pernikahan digital Anda di sini.`}
        />
        
        <div className="bg-white shadow-sm rounded-lg border border-wedding-champagne/20 p-6 mb-8 transition-all hover:shadow-md">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <TabsList className="bg-wedding-light-blush">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="drafts">Draft</TabsTrigger>
                <TabsTrigger value="published">Dipublikasikan</TabsTrigger>
                <TabsTrigger value="favorites">Favorit</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari undangan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-wedding-champagne/30 focus-visible:ring-wedding-rosegold"
                />
              </div>
            </div>
            
            <TabsContent value="all" className="mt-2">
              {filteredInvitations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInvitations.map((invitation) => (
                    <InvitationCard key={invitation.id} {...invitation} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Tidak ada undangan ditemukan.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="drafts">
              <div className="text-center py-10">
                <p className="text-gray-500">Tidak ada draft undangan.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="published">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvitations.slice(0, 2).map((invitation) => (
                  <InvitationCard key={invitation.id} {...invitation} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="text-center py-10">
                <p className="text-gray-500">Tidak ada undangan favorit.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Acara Mendatang</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockInvitations.slice(0, 2).map((invitation) => (
              <div 
                key={invitation.id}
                className="bg-white p-4 rounded-lg border border-wedding-champagne/20 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="bg-wedding-light-blush rounded-full p-3">
                  <Calendar size={24} className="text-wedding-rosegold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-great-vibes text-xl text-wedding-deep-rosegold">{invitation.title}</h3>
                  <p className="text-sm text-gray-600">{invitation.date}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>{invitation.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
