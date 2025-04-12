
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Eye, Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Invitation {
  id: string;
  title: string;
  template_id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  main_date: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const { data, error } = await supabase
          .from("invitations")
          .select("id, title, template_id, slug, bride_name, groom_name, main_date, created_at")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setInvitations(data || []);
      } catch (error: any) {
        toast.error("Gagal memuat undangan: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchInvitations();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus undangan ini?")) {
      try {
        const { error } = await supabase
          .from("invitations")
          .delete()
          .eq("id", id);

        if (error) throw error;
        setInvitations(invitations.filter(inv => inv.id !== id));
        toast.success("Undangan berhasil dihapus");
      } catch (error: any) {
        toast.error("Gagal menghapus undangan: " + error.message);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold font-playfair text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Kelola undangan pernikahan digital Anda
              </p>
            </div>
            <Button asChild className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold">
              <Link to="/templates">
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Undangan Baru
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center my-12">
              <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
            </div>
          ) : invitations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Belum Ada Undangan</h2>
              <p className="text-gray-600 mb-6">
                Anda belum membuat undangan pernikahan digital. Mulailah dengan membuat undangan pertama Anda.
              </p>
              <Button asChild className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold">
                <Link to="/templates">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Buat Undangan Sekarang
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map((invitation) => (
                <Card key={invitation.id} className="overflow-hidden">
                  <CardHeader className="bg-wedding-light-blush pb-2">
                    <CardTitle>{invitation.title}</CardTitle>
                    <CardDescription>
                      {invitation.bride_name} & {invitation.groom_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Tanggal:</span>{" "}
                        {formatDate(invitation.main_date)}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Slug:</span>{" "}
                        {invitation.slug}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Dibuat:</span>{" "}
                        {formatDate(invitation.created_at)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/invitation/${invitation.slug}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat
                      </Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/create/${invitation.template_id}`} state={{ weddingData: invitation }}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(invitation.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
