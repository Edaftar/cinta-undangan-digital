
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
