import { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { templates } from "@/data/templates";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Download, Heart, Loader2 } from "lucide-react";
import ElegantRoseTemplate from "@/components/templates/ElegantRoseTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import RusticTemplate from "@/components/templates/RusticTemplate";
import TraditionalJavaTemplate from "@/components/templates/TraditionalJavaTemplate";
import ModernGeometryTemplate from "@/components/templates/ModernGeometryTemplate";
import IslamicOrnamentTemplate from "@/components/templates/IslamicOrnamentTemplate";
import IslamicEleganceTemplate from "@/components/templates/IslamicEleganceTemplate";
import RSVP from "@/components/RSVP";
import { toast } from "sonner";
import { generateInvitationPDF } from "@/utils/pdfUtils";
import MusicPlayer from "@/components/MusicPlayer";
import { fetchMusicById } from "@/services/musicService";
import { motion } from "framer-motion";

interface Invitation {
  id: string;
  title: string;
  template_id: string;
  slug: string;
  bride_name: string;
  bride_father?: string;
  bride_mother?: string;
  bride_photo?: string;
  groom_name: string;
  groom_father?: string;
  groom_mother?: string;
  groom_photo?: string;
  main_date: string;
  akad_date?: string;
  reception_date?: string;
  location: string;
  location_address?: string;
  location_map_url?: string;
  love_story?: string;
  gallery?: string[];
  user_id: string;
  music_id?: string;
}

const PreviewTemplate = () => {
  const { templateId, slug } = useParams<{ templateId?: string, slug?: string }>();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [music, setMusic] = useState<{url: string, title?: string, artist?: string} | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from location state if available (passed from the form)
  const weddingData = location.state?.weddingData;

  useEffect(() => {
    const fetchInvitationBySlug = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("invitations")
          .select("*")
          .eq("slug", slug)
          .eq("active", true)
          .single();

        if (error) throw error;
        
        if (data) {
          console.log("Fetched invitation data:", data);
          setInvitation(data);
          
          // Fetch music if music_id is available
          if (data.music_id) {
            const musicData = await fetchMusicById(data.music_id);
            if (musicData) {
              setMusic({
                url: musicData.url,
                title: musicData.title,
                artist: musicData.artist || undefined
              });
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching invitation:", error);
        toast.error("Undangan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitationBySlug();
  }, [slug]);

  // Use template ID from params or from fetched invitation
  const currentTemplateId = templateId || invitation?.template_id;
  const template = templates.find((t) => t.id === currentTemplateId);
  
  // Use data from weddingData (form) or fetched invitation
  const displayData = weddingData || invitation;

  console.log("Current template ID:", currentTemplateId);
  console.log("Display data:", displayData);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Undangan Pernikahan ${displayData?.bride_name || 'Pengantin'} & ${displayData?.groom_name || 'Pengantin'}`,
        text: 'Kami mengundang Anda untuk hadir di acara pernikahan kami',
        url: window.location.href,
      })
      .catch(() => {
        // Fallback if share fails
        navigator.clipboard.writeText(window.location.href);
        toast.success("Tautan berhasil disalin ke clipboard");
      });
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tautan berhasil disalin ke clipboard");
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const result = await generateInvitationPDF('invitation-container', `undangan-${displayData?.bride_name}-${displayData?.groom_name}.pdf`);
      if (result) {
        toast.success("Undangan berhasil diunduh");
      } else {
        toast.error("Gagal mengunduh undangan");
      }
    } catch (error) {
      toast.error("Gagal mengunduh undangan");
      console.error("PDF download error:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-ivory">
        <Loader2 className="h-12 w-12 animate-spin text-wedding-rosegold" />
        <p className="mt-4 text-gray-600">Memuat undangan...</p>
      </div>
    );
  }

  if (!template && !slug) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Template Tidak Ditemukan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-6"
          >
            Maaf, template yang Anda cari tidak tersedia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild>
              <Link to="/templates" className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                <ChevronLeft size={16} />
                Kembali ke Galeri Template
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!displayData && slug) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Undangan Tidak Ditemukan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-6"
          >
            Maaf, undangan yang Anda cari tidak tersedia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild>
              <Link to="/" className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                <ChevronLeft size={16} />
                Kembali ke Halaman Utama
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const getTemplateComponent = () => {
    // Fix: Make sure we normalize gallery data to avoid undefined values
    const safeDisplayData = {
      ...displayData,
      // Make sure gallery exists and is an array
      gallery: Array.isArray(displayData?.gallery) ? displayData?.gallery : []
    };
    
    console.log("Template being rendered:", currentTemplateId);
    console.log("With data:", safeDisplayData);
    
    switch(currentTemplateId) {
      case 'elegant-1':
        return <ElegantRoseTemplate data={safeDisplayData} />;
      case 'minimalist-1':
        return <MinimalistTemplate data={safeDisplayData} />;
      case 'rustic-1':
        return <RusticTemplate data={safeDisplayData} />;
      case 'traditional-1':
        return <TraditionalJavaTemplate data={safeDisplayData} />;
      case 'modern-1':
        return <ModernGeometryTemplate data={safeDisplayData} />;
      case 'islamic-1':
        return <IslamicOrnamentTemplate data={safeDisplayData} />;
      case 'islamic-2':
        return <IslamicEleganceTemplate data={safeDisplayData} />;
      default:
        return <ElegantRoseTemplate data={safeDisplayData} />; // Fallback to elegant template
    }
  };

  // If we're viewing a public invitation by slug, show only the template without navigation
  if (slug && invitation) {
    return (
      <div className="relative">
        {music && <MusicPlayer audioUrl={music.url} title={music.title} artist={music.artist} autoplay={true} iconOnly={true} />}
        <div id="invitation-container">{getTemplateComponent()}</div>
        
        {/* Add RSVP section for public invitations */}
        <section className="py-16 px-4 bg-wedding-ivory">
          <div className="max-w-md mx-auto">
            <RSVP invitationId={invitation.id} invitationTitle={invitation.title} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-8">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <Button
              variant="outline"
              className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
              asChild
            >
              <Link to="/templates">
                <ChevronLeft size={16} className="mr-1" />
                Kembali ke Galeri Template
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button 
                className="bg-wedding-sage hover:bg-wedding-sage/80 text-white"
                onClick={handleShare}
              >
                <Share2 size={16} className="mr-1" />
                Bagikan
              </Button>
              
              <Button 
                className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                onClick={handleDownloadPDF}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Mengunduh...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-1" />
                    Unduh PDF
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">Pratinjau Undangan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ini adalah tampilan undangan digital Anda menggunakan template {template?.name}
            </p>
          </motion.div>
          
          <motion.div 
            id="invitation-container" 
            className="mx-auto max-w-4xl mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {music && (
              <div className="mb-4 flex justify-center">
                <MusicPlayer 
                  audioUrl={music.url}
                  title={music.title}
                  artist={music.artist}
                />
              </div>
            )}
            {getTemplateComponent()}
          </motion.div>
          
          <motion.div 
            className="text-center space-y-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="p-6 bg-wedding-light-blush rounded-lg shadow-sm">
              <Heart className="text-wedding-rosegold mx-auto mb-3" fill="#D8A7B1" />
              <p className="text-gray-700">
                {weddingData ? 
                  "Undangan digital Anda sudah siap untuk dibagikan. Gunakan tombol 'Bagikan' untuk menyebarkan undangan kepada teman dan keluarga." :
                  "Ini adalah pratinjau template. Untuk membuat undangan yang sesungguhnya, silakan isi form dengan data pernikahan Anda."
                }
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
              {!weddingData && (
                <Button 
                  className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white px-8"
                  asChild
                >
                  <Link to={`/create/${currentTemplateId}`}>
                    Buat Undangan
                  </Link>
                </Button>
              )}
              
              {weddingData && (
                <Button 
                  variant="outline"
                  className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush px-8"
                  asChild
                >
                  <Link to={`/create/${currentTemplateId}`} state={{ weddingData }}>
                    Edit Undangan
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PreviewTemplate;
