
import { supabase as integratedSupabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Export the integrated Supabase client
export const supabase = integratedSupabase;

// Export a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // Always return true since we're using the integrated client
};

// Export the Database type for type checking
export type { Database };
