
import { createClient } from '@supabase/supabase-js';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      wallets: {
        Row: {
          id: number
          user_id: string
          balance: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          balance?: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          balance?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          service_id: number
          link: string
          quantity: number
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          service_id: number
          link: string
          quantity: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          service_id?: number
          link?: string
          quantity?: number
          status?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: number
          name: string
          platform: string
          price: number
          description: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          platform: string
          price: number
          description: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          platform?: string
          price?: number
          description?: string
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: number
          user_id: string
          amount: number
          type: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          amount: number
          type: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          amount?: number
          type?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string
          email?: string
          phone?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          updated_at?: string | null
        }
      }
    }
  }
}

// Create a single supabase client for the entire app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase configuration is missing. Please check your environment variables.");
  
  // Display a more user-friendly message to the console for debugging
  console.log(`
    Supabase integration requires the following environment variables:
    - VITE_SUPABASE_URL: The URL of your Supabase project
    - VITE_SUPABASE_ANON_KEY: The anonymous/public API key for your Supabase project
    
    Please connect your project to Supabase using the green Supabase button in the top right corner.
  `);
}

// Use fallback values if environment variables are missing (these won't work in production)
const fallbackUrl = "https://placeholder-url.supabase.co";
const fallbackKey = "placeholder-key";

// Create the Supabase client with the real values if available, or fallbacks for development
export const supabase = createClient<Database>(
  supabaseUrl || fallbackUrl,
  supabaseKey || fallbackKey
);

// Export a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseKey;
};
