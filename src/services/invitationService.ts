
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Invitation {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  template_id: string;
  groom_name: string;
  bride_name: string;
  groom_father?: string;
  groom_mother?: string;
  bride_father?: string;
  bride_mother?: string;
  main_date: string;
  akad_date?: string;
  reception_date?: string;
  location: string;
  location_address?: string;
  location_map_url?: string;
  love_story?: string;
  gallery?: string[];
  groom_photo?: string;
  bride_photo?: string;
  active?: boolean;
  created_at: string;
  updated_at: string;
  // Add music URL field
  music_url?: string;
}

export interface CreateInvitationInput {
  title: string;
  slug: string;
  template_id: string;
  groom_name: string;
  bride_name: string;
  groom_father?: string;
  groom_mother?: string;
  bride_father?: string;
  bride_mother?: string;
  main_date: string;
  akad_date?: string;
  reception_date?: string;
  location: string;
  location_address?: string;
  location_map_url?: string;
  love_story?: string;
  gallery?: string[];
  groom_photo?: string;
  bride_photo?: string;
  // Add music URL field
  music_url?: string;
  user_id: string; // Add user_id to match the database expectation
}

// Function to create a new invitation
export const createInvitation = async (data: CreateInvitationInput): Promise<Invitation> => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return invitation;
  } catch (error: any) {
    console.error("Error creating invitation:", error);
    throw error;
  }
};

// Function to update an existing invitation
export const updateInvitation = async (id: string, data: Partial<CreateInvitationInput>): Promise<Invitation> => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return invitation;
  } catch (error: any) {
    console.error("Error updating invitation:", error);
    throw error;
  }
};

// Function to fetch an invitation by ID
export const fetchInvitationById = async (id: string): Promise<Invitation | null> => {
  try {
    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching invitation by id:", error);
    return null;
  }
};

// Function to fetch an invitation by slug
export const fetchInvitationBySlug = async (slug: string): Promise<Invitation | null> => {
  try {
    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching invitation by slug:", error);
    return null;
  }
};

// Function to fetch all invitations for the current user
export const fetchUserInvitations = async (): Promise<Invitation[]> => {
  try {
    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching user invitations:", error);
    throw error;
  }
};

// Function to delete an invitation
export const deleteInvitation = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("invitations")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting invitation:", error);
    throw error;
  }
};
