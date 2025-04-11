
import { useParams, Link, useLocation } from "react-router-dom";
import { templates } from "@/data/templates";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Download, Heart } from "lucide-react";
import ElegantRoseTemplate from "@/components/templates/ElegantRoseTemplate";
import { toast } from "sonner";

const PreviewTemplate = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const template = templates.find((t) => t.id === templateId);
  const location = useLocation();
  
  // Get data from location state if available (passed from the form)
  const weddingData = location.state?.weddingData;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Undangan Pernikahan ${weddingData?.brideName || 'Pengantin'} & ${weddingData?.groomName || 'Pengantin'}`,
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

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Template Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Maaf, template yang Anda cari tidak tersedia.
          </p>
          <Button asChild>
            <Link to="/templates" className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
              <ChevronLeft size={16} />
              Kembali ke Galeri Template
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getTemplateComponent = () => {
    switch(template.id) {
      case 'elegant-1':
        return <ElegantRoseTemplate data={weddingData} />;
      // Add more cases here as you develop more templates
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-600">Template preview belum tersedia</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
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
              
              <Button className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                <Download size={16} className="mr-1" />
                Unduh PDF
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">Pratinjau Undangan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ini adalah tampilan undangan digital Anda menggunakan template {template.name}
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl mb-8">
            {getTemplateComponent()}
          </div>
          
          <div className="text-center space-y-6 max-w-2xl mx-auto">
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
                  <Link to={`/create/${template.id}`}>
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
                  <Link to={`/create/${template.id}`} state={{ weddingData }}>
                    Edit Undangan
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreviewTemplate;
