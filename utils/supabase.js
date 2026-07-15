import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Please add them to your .env.local file.');
}

// On the server, use the service role key if available to bypass Row Level Security.
const isServer = typeof window === 'undefined';
const keyToUse = (isServer && supabaseServiceRoleKey) ? supabaseServiceRoleKey : supabaseAnonKey;

export const supabase = createClient(supabaseUrl, keyToUse);
