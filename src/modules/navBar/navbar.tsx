import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useAuthSignOut } from '@react-query-firebase/auth';
import dynamic from 'next/dynamic';

import { firebaseAuth } from 'utils';
import { routes } from '@constants';

const Cart = dynamic(() => import('../cart').then((module) => module.Cart), {
  ssr: false,
});

const {
  default: { auth, about, faq, root },
  users: { root: usersRoot },
  admin: { root: adminRoot },
} = routes;

export const NavBar = () => {
  const user = useAuthUser();
  const router = useRouter();
  const signOut = useAuthSignOut(firebaseAuth);

  return (
    <nav className="flex h-[--header-size] items-center justify-between bg-primary px-2 text-white sm:px-6 lg:px-8">
      <Link href={root}>
        <p>Logo</p>
      </Link>

      <ul className="flex gap-4">
        {user.id && !user.claims.admin && (
          <li>
            <Link href={usersRoot}>Library</Link>
          </li>
        )}

        {user.claims.admin && !router.pathname.includes(adminRoot) && (
          <li>
            <Link href={adminRoot}>Admin Page</Link>
          </li>
        )}

        <li>
          <Link href={about}>About</Link>
        </li>
        <li>
          <Link href={faq}>FAQ</Link>
        </li>

        <li>
          <Cart />
        </li>

        {!user.id && (
          <li>
            <Link href={auth}>Login</Link>
          </li>
        )}

        {user.id && <button onClick={() => signOut.mutate()}>signOut</button>}
      </ul>
    </nav>
  );
};
