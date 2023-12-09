import CountdownTimer from '@/components/countdown-timer';
import TaskList from '@/components/sortable-list';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { useSupabaseServerClient } from '@/lib/hooks/supabase';
import { setUser } from '@/lib/store';
import Nav from '@/components/nav';

export default async function Home() {
	const cookieStore = cookies();
	const supabase = useSupabaseServerClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

  console.log(user);
	if (!user) {
		redirect('/sign-up');
	} else {
		setUser(user);
	}

	return (
		<div className='flex w-full h-full flex-col gap-4'>
      <Nav />
			<CountdownTimer />
			<TaskList />
			<Toaster />
		</div>
	);
}
