export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      guests: {
        Row: {
          attendance_status: string | null
          created_at: string
          email: string | null
          id: string
          invitation_id: string
          message: string | null
          name: string
          number_of_guests: number | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          attendance_status?: string | null
          created_at?: string
          email?: string | null
          id?: string
          invitation_id: string
          message?: string | null
          name: string
          number_of_guests?: number | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          attendance_status?: string | null
          created_at?: string
          email?: string | null
          id?: string
          invitation_id?: string
          message?: string | null
          name?: string
          number_of_guests?: number | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          active: boolean | null
          akad_date: string | null
          bride_father: string | null
          bride_mother: string | null
          bride_name: string
          bride_photo: string | null
          created_at: string
          gallery: string[] | null
          groom_father: string | null
          groom_mother: string | null
          groom_name: string
          groom_photo: string | null
          id: string
          location: string
          location_address: string | null
          location_map_url: string | null
          love_story: string | null
          main_date: string
          music_id: string | null
          reception_date: string | null
          slug: string
          template_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          akad_date?: string | null
          bride_father?: string | null
          bride_mother?: string | null
          bride_name: string
          bride_photo?: string | null
          created_at?: string
          gallery?: string[] | null
          groom_father?: string | null
          groom_mother?: string | null
          groom_name: string
          groom_photo?: string | null
          id?: string
          location: string
          location_address?: string | null
          location_map_url?: string | null
          love_story?: string | null
          main_date: string
          music_id?: string | null
          reception_date?: string | null
          slug: string
          template_id: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          akad_date?: string | null
          bride_father?: string | null
          bride_mother?: string | null
          bride_name?: string
          bride_photo?: string | null
          created_at?: string
          gallery?: string[] | null
          groom_father?: string | null
          groom_mother?: string | null
          groom_name?: string
          groom_photo?: string | null
          id?: string
          location?: string
          location_address?: string | null
          location_map_url?: string | null
          love_story?: string | null
          main_date?: string
          music_id?: string | null
          reception_date?: string | null
          slug?: string
          template_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_music_id_fkey"
            columns: ["music_id"]
            isOneToOne: false
            referencedRelation: "music_options"
            referencedColumns: ["id"]
          },
        ]
      }
      music_options: {
        Row: {
          artist: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          artist?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          artist?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
