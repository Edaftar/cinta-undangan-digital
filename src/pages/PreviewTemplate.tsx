
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const PreviewTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const [weddingData, setWeddingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeddingData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!slug) {
          setError("Invalid URL.");
          return;
        }
        const data = await fetchInvitationBySlug(slug);
        if (data) {
          setWeddingData(data);
        } else {
          setError("Invitation not found or is inactive.");
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
      return <ErrorMessage message="Template not found." />;
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
      default:
        return <ErrorMessage message="Template not supported." />;
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
