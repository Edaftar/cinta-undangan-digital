
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

export const createMusic = async (musicData: Partial<MusicOption>): Promise<MusicOption> => {
  try {
    const { data, error } = await supabase
      .from("music_options")
      .insert([musicData])
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
