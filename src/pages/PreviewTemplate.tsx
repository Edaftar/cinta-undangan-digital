import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInvitationBySlug } from "@/services/invitationService";
import EleganceWhiteTemplate from "@/components/templates/EleganceWhiteTemplate";
import SimpleBlackTemplate from "@/components/templates/SimpleBlackTemplate";
import ClassicGoldTemplate from "@/components/templates/ClassicGoldTemplate";
import ModernFloralTemplate from "@/components/templates/ModernFloralTemplate";
import MinimalistGreenTemplate from "@/components/templates/MinimalistGreenTemplate";
import { templates } from "@/data/templates";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorMessage from "@/components/ErrorMessage";
import MusicPlayer from "@/components/MusicPlayer";
import { toast } from "sonner";

const PreviewTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [weddingData, setWeddingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeddingData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!slug) {
          setError("Invalid URL: Missing invitation slug.");
          return;
        }
        
        // Check if the slug exists in templates list
        const isTemplatePreview = templates.some(t => t.id === slug);
        
        if (isTemplatePreview) {
          // If it's a template preview, create dummy data
          setWeddingData({
            template_id: slug,
            bride_name: "Putri Cahaya",
            groom_name: "Putra Bintang",
            bride_father: "Bapak Sutrisno",
            bride_mother: "Ibu Wati",
            groom_father: "Bapak Bambang",
            groom_mother: "Ibu Siti", 
            main_date: new Date().toISOString(),
            akad_date: new Date().toISOString(),
            reception_date: new Date().toISOString(),
            location: "Gedung Pernikahan Bahagia",
            location_address: "Jl. Kebahagiaan No. 123, Jakarta",
            location_map_url: "https://maps.google.com/",
            love_story: "Kami bertemu saat kuliah di universitas yang sama. Dari mulai berkenalan hingga akhirnya memutuskan untuk menjalin hubungan. Sekarang kami siap melangkah ke jenjang pernikahan.",
            gallery: [
              "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3",
              "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3",
              "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3"
            ],
            music_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          });
          setLoading(false);
          return;
        }
        
        // Otherwise, load real invitation data
        const data = await fetchInvitationBySlug(slug);
        if (data) {
          setWeddingData(data);
        } else {
          setError("Invitation not found. The link may be incorrect or the invitation is no longer active.");
        }
      } catch (e: any) {
        console.error("Failed to load wedding data:", e);
        setError(e.message || "Failed to load invitation data.");
      } finally {
        setLoading(false);
      }
    };

    loadWeddingData();
  }, [slug]);

  const renderTemplate = () => {
    if (!weddingData) return null;

    const templateData = {
      bride_name: weddingData.bride_name || "",
      groom_name: weddingData.groom_name || "",
      bride_photo: weddingData.bride_photo || "",
      groom_photo: weddingData.groom_photo || "",
      bride_father: weddingData.bride_father || "",
      bride_mother: weddingData.bride_mother || "",
      groom_father: weddingData.groom_father || "",
      groom_mother: weddingData.groom_mother || "",
      main_date: weddingData.main_date || new Date().toISOString(),
      akad_date: weddingData.akad_date || "",
      reception_date: weddingData.reception_date || "",
      location: weddingData.location || "",
      location_address: weddingData.location_address || "",
      location_map_url: weddingData.location_map_url || "",
      love_story: weddingData.love_story || "",
      gallery: weddingData.gallery || [],
      music_url: weddingData.music_url || "",
    };

    const templateId = weddingData.template_id;
    const template = templates.find((t) => t.id === templateId);

    if (!template) {
      return <ErrorMessage message={`Template "${templateId}" not found.`} />;
    }

    switch (templateId) {
      case "elegance-white":
        return <EleganceWhiteTemplate data={templateData} />;
      case "simple-black":
        return <SimpleBlackTemplate data={templateData} />;
      case "classic-gold":
        return <ClassicGoldTemplate data={templateData} />;
      case "modern-floral":
        return <ModernFloralTemplate data={templateData} />;
      case "minimalist-green":
        return <MinimalistGreenTemplate data={templateData} />;
      case "minimalist-1":
      case "minimalist-2":
      case "rustic-template":
      case "traditional-java":
      case "islamic-ornament":
      case "modern-geometry":
        return <ErrorMessage message={`Template "${templateId}" is still under development.`} />;
      default:
        return <ErrorMessage message={`Template "${templateId}" not supported.`} />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default PreviewTemplate;
