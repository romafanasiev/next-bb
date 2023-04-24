import Link from 'next/link';
import { useAuthUser } from 'next-firebase-auth';
import { useAuthSignOut } from '@react-query-firebase/auth';

import { firebaseAuth } from 'utils';
import { routes } from '@constants';

export const NavBar = () => {
  const user = useAuthUser();
  const signOut = useAuthSignOut(firebaseAuth);

  return (
    <nav className="flex h-16 items-center justify-between bg-primary px-2 text-white sm:px-6 lg:px-8">
      <p>Logo</p>
      <div className="flex gap-4">
        {!user.id && <Link href={routes.auth}>Login</Link>}
        {user.id && (user.claims.admin ? <p>Hello Admin</p> : <p>Just user</p>)}
        {user.id && <button onClick={() => signOut.mutate()}>signOut</button>}
        {/* {!props.user?.id && <Link href="/auth">Login</Link>}
    {props.user?.id && <Link href="/">SignOut</Link>} */}
      </div>
    </nav>
  );
};
