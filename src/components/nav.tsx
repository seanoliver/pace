'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSupabaseBrowserClient } from '@/lib/hooks/use-supabase-browser';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Nav() {
	const supabase = useSupabaseBrowserClient();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error('ERROR GETTING USER', error)
				return;
			} else if (!data) {
				console.error('NO USER DATA')
				return;
			} else {
				setUser(data.session?.user as User);
			}
		}
		getUser();
	}, [])

	if (user) {
		return (
			<UserAvatar user={user} />
		)
	} else {
		return (
			<NullUser />
		)
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