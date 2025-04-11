
import { useParams, Link } from "react-router-dom";
import { templates } from "@/data/templates";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2 } from "lucide-react";

const PreviewTemplate = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const template = templates.find((t) => t.id === templateId);

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

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
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
            
            <Button className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
              <Share2 size={16} className="mr-1" />
              Bagikan Undangan
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">Pratinjau Undangan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ini adalah tampilan undangan digital Anda menggunakan template {template.name}
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl">
            <div className="p-8 text-center">
              <div className="mb-8">
                <p className="text-wedding-rosegold font-dancing text-2xl md:text-3xl mb-2">Undangan Pernikahan</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">Nama & Nama</h2>
                <p className="text-gray-600">Sabtu, 20 Juni 2025</p>
              </div>
              
              <div className="w-full h-64 md:h-96 bg-gray-100 mb-8 rounded flex items-center justify-center">
                <p className="text-gray-500">Pratinjau undangan akan ditampilkan di sini</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-600">
                  Anda telah berhasil membuat undangan pernikahan digital!
                  Dalam versi lengkap, di sini akan ditampilkan seluruh informasi yang telah Anda masukkan
                  sebelumnya, sesuai dengan template yang Anda pilih.
                </p>
                <p className="text-gray-600">
                  Fitur ini masih dalam pengembangan. Harap tunggu pembaruan selanjutnya.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white px-8"
                  asChild
                >
                  <Link to={`/create/${template.id}`}>
                    Edit Undangan
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreviewTemplate;
