
import { useParams, useLocation, Link } from "react-router-dom";
import { templates } from "@/data/templates";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateForm from "@/components/TemplateForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const CreateTemplate = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const location = useLocation();
  const template = templates.find((t) => t.id === templateId);
  const existingData = location.state?.weddingData;
  
  const isEditing = !!existingData;

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
          <div className="mb-8">
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
          </div>
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">
              {isEditing ? "Edit Undangan Pernikahan" : "Buat Undangan Pernikahan"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isEditing 
                ? "Edit informasi pernikahan Anda untuk memperbarui undangan digital"
                : `Isi informasi pernikahan Anda untuk membuat undangan digital dengan template ${template.name}`
              }
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
              <div className="aspect-[3/4] mb-4 overflow-hidden rounded-md">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold font-playfair">{template.name}</h3>
              <p className="text-gray-600 mt-2">{template.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Fitur Template:</h4>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-wedding-rosegold rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <TemplateForm templateId={template.id} existingData={existingData} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTemplate;
