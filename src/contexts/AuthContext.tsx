
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  isConfigured: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const supabaseConfigured = isSupabaseConfigured();

  useEffect(() => {
    // Only attempt to get session if Supabase is configured
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error.message);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call setData immediately
    setData();

    // Listen for auth changes only if Supabase is configured
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabaseConfigured]);

  const signIn = async (email: string, password: string) => {
    if (!supabaseConfigured) {
      toast({
        title: "Supabase Not Configured",
        description: "Please connect your project to Supabase first.",
        variant: "destructive",
      });
      throw new Error("Supabase not configured");
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "Successfully signed in.",
      });
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    if (!supabaseConfigured) {
      toast({
        title: "Supabase Not Configured",
        description: "Please connect your project to Supabase first.",
        variant: "destructive",
      });
      throw new Error("Supabase not configured");
    }

    try {
      // Step 1: Sign up the user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Step 2: If successful, create a profile and wallet entry for the user
      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            phone: phone,
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
        
        // Create wallet with default balance of 0
        const { error: walletError } = await supabase
          .from('wallets')
          .insert({
            user_id: data.user.id,
            balance: 0,
          });
          
        if (walletError) {
          console.error('Error creating wallet:', walletError);
        }
      }
      
      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!supabaseConfigured) {
      toast({
        title: "Supabase Not Configured",
        description: "Please connect your project to Supabase first.",
        variant: "destructive",
      });
      throw new Error("Supabase not configured");
    }

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut,
      isConfigured: supabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
