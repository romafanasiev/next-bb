import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Admin = () => {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (!user.claims.admin) {
      router.push('/');
    }
  }, [user]);

  return (
    <main className="bg-slate-700 p-10">
      <p>Admin page</p>
    </main>
  );
};

// export const getServerSideProps = withAuthUserSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })(async ({ AuthUser }) => await protectedPages(AuthUser));

export default withAuthUser()(Admin);
