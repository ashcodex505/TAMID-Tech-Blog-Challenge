import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Get the site URL based on environment
const getSiteUrl = () => {
  if (import.meta.env.VITE_ENV_STATE === "development") {
    return "http://localhost:5173";
  }
  return "https://tamid-tech-blog-challenge.vercel.app";
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});