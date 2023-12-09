import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'development') {
	supabaseUrl = 'http://127.0.0.1:54321';
}

export const useSupabaseBrowserClient = () =>
	createBrowserClient(supabaseUrl!, supabaseAnonKey!);

export const useSupabaseServerClient = (
	cookieStore: ReturnType<typeof cookies>
) => {
	return createServerClient(supabaseUrl!, supabaseAnonKey!, {
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value;
			},
		},
	});
};

export const useSupabase = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseBrowserClient();

	useEffect(() => {
		const checkSession = async () => {
			// Check active sessions and set user
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user ?? null);
			setLoading(false);
		};

		checkSession();

		// Listen for changes to auth state (login, logout)
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setUser(session?.user ?? null);
			}
		);

		// Cleanup auth listener
		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	return { user, loading };
};
