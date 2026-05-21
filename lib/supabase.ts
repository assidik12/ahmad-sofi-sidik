import { createClient } from '@supabase/supabase-js';

// Safe placeholders for build-time static prerendering
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project-id.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key-to-pass-nextjs-build-checks';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (typeof window === 'undefined') {
    console.warn("⚠️ [Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing! Using build-time placeholders.");
  }
}

// Initialize Supabase Client safely
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
