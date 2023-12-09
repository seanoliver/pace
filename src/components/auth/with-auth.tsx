import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (ProtectedComponent: React.FC<any>) => {
	return function WithAuthComponent(props: React.PropsWithChildren<{}>) {
		const router = useRouter();
		const { user, loading } = useAuth(); // TODO: Define this hook

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
