import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Nav() {
	return (
		<div className='flex items-center gap-4 justify-end m-2'>
			<Avatar>
				<AvatarImage src='https://github.com/shadcnf.png' />
				<AvatarFallback>
					{user?.email?.slice(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className='text-xs'>{user?.email?.split('@')[0]}</div>
		</div>
	);
}
