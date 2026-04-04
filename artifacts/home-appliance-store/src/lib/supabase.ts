import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

let supabaseInstance: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = {
  auth: {
    getSession: async () => {
      if (!supabaseConfigured) return { data: { session: null }, error: null };
      return getSupabase().auth.getSession();
    },
    onAuthStateChange: (callback: Parameters<SupabaseClient["auth"]["onAuthStateChange"]>[0]) => {
      if (!supabaseConfigured) {
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
      return getSupabase().auth.onAuthStateChange(callback);
    },
    signInWithPassword: async (params: Parameters<SupabaseClient["auth"]["signInWithPassword"]>[0]) => {
      if (!supabaseConfigured) {
        return { data: { user: null, session: null }, error: new Error("Authentication not configured. Please provide Supabase credentials.") };
      }
      return getSupabase().auth.signInWithPassword(params);
    },
    signUp: async (params: Parameters<SupabaseClient["auth"]["signUp"]>[0]) => {
      if (!supabaseConfigured) {
        return { data: { user: null, session: null }, error: new Error("Authentication not configured. Please provide Supabase credentials.") };
      }
      return getSupabase().auth.signUp(params);
    },
    signOut: async () => {
      if (!supabaseConfigured) return { error: null };
      return getSupabase().auth.signOut();
    },
  },
};
