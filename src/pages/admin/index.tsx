import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Admin = () => {
  const user = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (user.id && !user.claims.admin) {
      router.replace('/');
    }
  }, [user]);

  return (
    <main className="bg-slate-700 p-10">
      <p>Admin page</p>
    </main>
  );
};

export default withAuthUser()(Admin);
