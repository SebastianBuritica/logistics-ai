import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          nit: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          plan: "starter" | "professional" | "business" | "enterprise";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          nit?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          plan?: "starter" | "professional" | "business" | "enterprise";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          nit?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          plan?: "starter" | "professional" | "business" | "enterprise";
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          company_id: string;
          email: string;
          role: "admin" | "manager" | "operator" | "driver";
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          company_id: string;
          email: string;
          role?: "admin" | "manager" | "operator" | "driver";
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          email?: string;
          role?: "admin" | "manager" | "operator" | "driver";
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          company_id: string;
          plate: string;
          type: "truck" | "van" | "motorcycle" | "car";
          brand: string | null;
          model: string | null;
          year: number | null;
          capacity_kg: number | null;
          status: "active" | "maintenance" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          plate: string;
          type: "truck" | "van" | "motorcycle" | "car";
          brand?: string | null;
          model?: string | null;
          year?: number | null;
          capacity_kg?: number | null;
          status?: "active" | "maintenance" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          plate?: string;
          type?: "truck" | "van" | "motorcycle" | "car";
          brand?: string | null;
          model?: string | null;
          year?: number | null;
          capacity_kg?: number | null;
          status?: "active" | "maintenance" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
