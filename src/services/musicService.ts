
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MusicOption {
  id: string;
  title: string;
  artist: string | null;
  url: string;
  is_active: boolean;
  created_at: string;
}

// Interface for template images
export interface TemplateImage {
  id: string;
  name: string;
  url: string;
  size?: number;
  isExternalUrl?: boolean;
  created_at?: string;
}

export const fetchMusicOptions = async (): Promise<MusicOption[]> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching music options:", error);
    throw error;
  }
};

export const fetchActiveMusicOptions = async (): Promise<MusicOption[]> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .select("*")
      .eq("is_active", true)
      .order("title", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching active music options:", error);
    throw error;
  }
};

export const fetchMusicById = async (id: string): Promise<MusicOption | null> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching music by id:", error);
    return null;
  }
};

export const createMusic = async (musicData: Partial<MusicOption>): Promise<MusicOption> => {
  try {
    // Fix: Ensure musicData is properly passed as a single object, not an array
    const { data, error } = await supabase
      .from("music_options")
      .insert(musicData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error creating music:", error);
    throw error;
  }
};

export const updateMusic = async (id: string, musicData: Partial<MusicOption>): Promise<MusicOption> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .update(musicData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error updating music:", error);
    throw error;
  }
};

export const deleteMusic = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("music_options")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting music:", error);
    throw error;
  }
};

// Template image functions
export const fetchTemplateImages = async (): Promise<TemplateImage[]> => {
  try {
    // This would typically fetch from a template_images table
    // For now, returning mock data
    const mockImages: TemplateImage[] = [
      {
        id: '1',
        name: 'Template Image 1',
        url: 'https://via.placeholder.com/600x400?text=Template+Image+1',
        size: 24560,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Template Image 2',
        url: 'https://via.placeholder.com/600x400?text=Template+Image+2',
        size: 18760,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockImages;
  } catch (error: any) {
    console.error("Error fetching template images:", error);
    throw error;
  }
};

export const uploadTemplateImage = async (file: File): Promise<TemplateImage> => {
  try {
    // Mock upload function - would typically upload to storage
    const mockImage: TemplateImage = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      created_at: new Date().toISOString()
    };
    
    return mockImage;
  } catch (error: any) {
    console.error("Error uploading template image:", error);
    throw error;
  }
};

export const saveExternalImageUrl = async (name: string, url: string): Promise<TemplateImage> => {
  try {
    // Mock function for external URL
    const mockImage: TemplateImage = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      url: url,
      isExternalUrl: true,
      created_at: new Date().toISOString()
    };
    
    return mockImage;
  } catch (error: any) {
    console.error("Error saving external image URL:", error);
    throw error;
  }
};

export const deleteTemplateImage = async (id: string): Promise<boolean> => {
  try {
    // Mock delete function
    return true;
  } catch (error: any) {
    console.error("Error deleting template image:", error);
    throw error;
  }
};
