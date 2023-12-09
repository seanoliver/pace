import CountdownTimer from '@/components/countdown-timer';
import TaskList from '@/components/sortable-list';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { useSupabaseServerClient } from '@/lib/hooks/supabase';
import { TimerStore, useTimerStore } from '@/lib/store';
import { useEffect } from 'react';


export default async function Home() {
	const cookieStore = cookies();
	const supabase = useSupabaseServerClient(cookieStore);
  const setUser = useTimerStore(state => (state as TimerStore).setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        redirect('/sign-up');
      } else {
        setUser(user)
      }
    };

    fetchUser();
  }, [])

	return (
		<div className='flex w-full h-full flex-col gap-4'>
			<CountdownTimer />
			<TaskList />
			<Toaster />
		</div>
	);
}
