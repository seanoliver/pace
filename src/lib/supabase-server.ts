import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (process.env.NODE_ENV === 'development') {
  supabaseUrl = 'http://127.0.0.1:54321'
}

export const supabaseServerClient = createServerClient(
  supabaseUrl!,
  supabaseAnonKey!,
  {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
    },
  },
)
