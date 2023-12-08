import CountdownTimer from '@/components/countdown-timer';
import TaskList from '@/components/sortable-list';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { useSupabaseServerClient } from '@/lib/hooks/supabase';

export default async function Home() {
  const cookieStore = cookies()
  const supabase = useSupabaseServerClient(cookieStore)

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
