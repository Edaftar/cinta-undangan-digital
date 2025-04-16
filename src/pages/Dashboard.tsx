
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarDays, Edit, Eye, ExternalLink, Loader2, MoreHorizontal, Trash2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestList from "@/components/GuestList";
import { templates } from "@/data/templates";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

interface Invitation {
  id: string;
  title: string;
  slug: string;
  template_id: string;
  bride_name: string;
  groom_name: string;
  main_date: string;
  location: string;
  active: boolean;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [guests, setGuests] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProcessing, setDeleteProcessing] = useState(false);

  useEffect(() => {
    fetchInvitations();
  }, [user]);

  const fetchInvitations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setInvitations(data);
        // Fetch guest count for each invitation
        data.forEach((invitation) => fetchGuestsByInvitationId(invitation.id));
      }
    } catch (error: any) {
      console.error("Error fetching invitations:", error.message);
      toast.error("Gagal memuat undangan");
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestsByInvitationId = async (invitationId: string) => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("invitation_id", invitationId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setGuests(prevGuests => ({
        ...prevGuests,
        [invitationId]: data || []
      }));
    } catch (error: any) {
      console.error(`Error fetching guests for invitation ${invitationId}:`, error.message);
    }
  };

  const toggleInvitationStatus = async (invitation: Invitation) => {
    try {
      const newStatus = !invitation.active;
      const { error } = await supabase
        .from("invitations")
        .update({ active: newStatus })
        .eq("id", invitation.id);

      if (error) {
        throw error;
      }

      setInvitations(prevInvitations => 
        prevInvitations.map(inv => 
          inv.id === invitation.id ? { ...inv, active: newStatus } : inv
        )
      );

      toast.success(
        newStatus ? 
        "Undangan berhasil diaktifkan" : 
        "Undangan berhasil dinonaktifkan"
      );
    } catch (error: any) {
      console.error("Error toggling invitation status:", error.message);
      toast.error("Gagal mengubah status undangan");
    }
  };

  const handleDeleteInvitation = async () => {
    if (!selectedInvitationId) return;
    
    setDeleteProcessing(true);
    
    try {
      // Delete all guests associated with this invitation
      const { error: guestsError } = await supabase
        .from("guests")
        .delete()
        .eq("invitation_id", selectedInvitationId);
      
      if (guestsError) {
        throw guestsError;
      }
      
      // Delete the invitation itself
      const { error: invitationError } = await supabase
        .from("invitations")
        .delete()
        .eq("id", selectedInvitationId);
      
      if (invitationError) {
        throw invitationError;
      }
      
      // Update the state to remove the deleted invitation
      setInvitations(prevInvitations => 
        prevInvitations.filter(inv => inv.id !== selectedInvitationId)
      );
      
      toast.success("Undangan berhasil dihapus");
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Error deleting invitation:", error.message);
      toast.error("Gagal menghapus undangan");
    } finally {
      setDeleteProcessing(false);
      setSelectedInvitationId(null);
    }
  };

  const getTemplateNameById = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.name : templateId;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEEE, d MMMM yyyy", { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
          <span className="ml-2 text-gray-600">Memuat data...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Kelola undangan digital Anda di sini</p>
          </motion.div>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Undangan Saya</h2>
              <Button 
                className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                asChild
              >
                <Link to="/templates">
                  Buat Undangan Baru
                </Link>
              </Button>
            </div>
            
            {invitations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">Belum Ada Undangan</h3>
                <p className="text-gray-600 mb-6">
                  Anda belum memiliki undangan digital. Mulai dengan membuat undangan pertama Anda.
                </p>
                <Button 
                  className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                  asChild
                >
                  <Link to="/templates">
                    Pilih Template
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invitations.map((invitation) => {
                  const template = templates.find(t => t.id === invitation.template_id);
                  const guestCount = guests[invitation.id]?.length || 0;
                  
                  return (
                    <Card key={invitation.id} className={`overflow-hidden ${!invitation.active ? 'opacity-75' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{invitation.title}</CardTitle>
                            <CardDescription>{getTemplateNameById(invitation.template_id)}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => navigate(`/invitation/${invitation.slug}`)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Lihat</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => navigate(`/create/${invitation.template_id}`, { state: { invitationId: invitation.id } })}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:text-red-600"
                                onClick={() => {
                                  setSelectedInvitationId(invitation.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Hapus</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant={invitation.active ? "default" : "outline"} className="mr-2">
                            {invitation.active ? "Aktif" : "Nonaktif"}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {guestCount} tamu
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex flex-col text-sm text-gray-600 space-y-1.5">
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2 text-wedding-sage" />
                            <span>{formatDate(invitation.main_date)}</span>
                          </div>
                          <div className="flex items-start">
                            <ExternalLink className="h-4 w-4 mr-2 text-wedding-sage shrink-0 mt-0.5" />
                            <span className="truncate">{`${window.location.origin}/invitation/${invitation.slug}`}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleInvitationStatus(invitation)}
                        >
                          {invitation.active ? "Nonaktifkan" : "Aktifkan"}
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-wedding-sage hover:bg-wedding-sage/80 text-white"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/invitation/${invitation.slug}`);
                            toast.success("Tautan berhasil disalin");
                          }}
                        >
                          Salin Tautan
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Tamu Undangan</h2>
            <GuestList invitations={invitations} />
          </motion.div>
        </div>
      </main>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Undangan</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Undangan ini akan dihapus secara permanen dari sistem kami.
              Semua data tamu undangan juga akan dihapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteProcessing}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteInvitation();
              }}
              disabled={deleteProcessing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Menghapus...</span>
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
