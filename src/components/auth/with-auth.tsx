'use client';

import { useSupabase } from '@/lib/hooks/use-supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (ProtectedComponent: React.FC<any>) => {
  console.log('withAuth');
	return function WithAuthComponent(props: React.PropsWithChildren<{}>) {
		const router = useRouter();
		const { user, loading } = useSupabase();

		useEffect(() => {
			if (!loading && !user) {
				router.push('/sign-up');
			}
		}, [user, loading, router]);

		if (loading || !user) {
			return <div>Loading...</div>;
		}

		return <ProtectedComponent {...props} />;
	};
};

export default withAuth;
