import CountdownTimer from '@/components/countdown-timer';
import TaskList from '@/components/sortable-list';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

export default async function Home() {
  const cookieStore = cookies()

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
	);

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-up')
  }

  console.log('user', user)

	return (
		<div className='flex w-full h-full flex-col gap-4'>
			<CountdownTimer />
			<TaskList />
      <Toaster />
		</div>
	);
}
