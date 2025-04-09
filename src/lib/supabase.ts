
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
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
