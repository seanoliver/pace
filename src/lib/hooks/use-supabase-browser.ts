import { createBrowserClient } from '@supabase/ssr';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'development') {
	supabaseUrl = 'http://127.0.0.1:54321';
}

/**
 * Creates a browser client for Supabase.
 */
export const supabaseClient = createBrowserClient(supabaseUrl!, supabaseAnonKey!);
