'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSupabase } from '@/lib/hooks/use-supabase';
import { User } from '@supabase/supabase-js';

export default function Nav() {
	const { user, loading } = useSupabase();

	if (loading) {
		return <LoadingUser />
	} else if (!user) {
		return <NullUser />
	} else {
		return <UserAvatar user={user} />;
	}
}


const UserAvatar = ({ user }: { user: User }) => {
	return (
		<div className='flex items-center gap-4 justify-end m-2'>
			<Avatar>
				<AvatarImage src='https://github.com/shadcn.png' />
				<AvatarFallback>
					{user?.email?.slice(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className='text-xs'>{user?.email?.split('@')[0]}</div>
		</div>
	)
};

const LoadingUser = () => {
	return (
		<div className='flex items-center gap-4 justify-end m-2'>
			Loading...
		</div>
	)
}

// TODO: Add sign in button
const NullUser = () => {
	return (
		<div className='flex items-center gap-4 justify-end m-2'>
			<div className='text-xs'>Sign In</div>
		</div>
	)
}