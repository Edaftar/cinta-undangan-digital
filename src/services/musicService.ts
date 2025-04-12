
import { supabase } from "@/integrations/supabase/client";

export interface MusicOption {
  id: string;
  title: string;
  artist: string | null;
  url: string;
  is_active: boolean;
}

export const fetchMusicOptions = async (): Promise<MusicOption[]> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .select("*")
      .eq("is_active", true)
      .order("title");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching music options:", error);
    return [];
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
  } catch (error) {
    console.error("Error fetching music:", error);
    return null;
  }
};

export const createMusic = async (music: Omit<MusicOption, 'id'>): Promise<MusicOption | null> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .insert(music)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating music option:", error);
    return null;
  }
};

export const updateMusic = async (id: string, music: Partial<Omit<MusicOption, 'id'>>): Promise<MusicOption | null> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .update(music)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating music option:", error);
    return null;
  }
};

export const deleteMusic = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("music_options")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting music option:", error);
    return false;
  }
};

// Image management functions
export interface TemplateImage {
  id: string;
  name: string;
  url: string;
  size?: number;
  created_at?: string;
  type?: string;
  isExternalUrl?: boolean;
}

export const uploadTemplateImage = async (file: File): Promise<TemplateImage | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('template_images')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('template_images')
      .getPublicUrl(filePath);

    return {
      id: fileName,
      name: file.name,
      url: data.publicUrl,
      size: file.size,
      created_at: new Date().toISOString(),
      type: file.type,
      isExternalUrl: false
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const saveExternalImageUrl = async (name: string, url: string): Promise<TemplateImage | null> => {
  try {
    // This doesn't actually save to Supabase storage but just returns the URL formatted
    // in the same way as our internal images for consistent handling
    return {
      id: `external_${Math.random().toString(36).substring(2, 15)}`,
      name: name,
      url: url,
      created_at: new Date().toISOString(),
      isExternalUrl: true
    };
  } catch (error) {
    console.error("Error saving external image URL:", error);
    return null;
  }
};

export const fetchTemplateImages = async (): Promise<TemplateImage[]> => {
  try {
    const { data, error } = await supabase.storage
      .from('template_images')
      .list();

    if (error) throw error;

    return data.map(item => ({
      id: item.name,
      name: item.name,
      url: supabase.storage.from('template_images').getPublicUrl(item.name).data.publicUrl,
      size: item.metadata?.size,
      created_at: item.created_at,
      isExternalUrl: false
    }));
  } catch (error) {
    console.error("Error fetching template images:", error);
    return [];
  }
};

export const deleteTemplateImage = async (fileName: string): Promise<boolean> => {
  try {
    // Only delete if it's not an external URL
    if (fileName.startsWith('external_')) {
      return true;
    }
    
    const { error } = await supabase.storage
      .from('template_images')
      .remove([fileName]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting template image:", error);
    return false;
  }
};
