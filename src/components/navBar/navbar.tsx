import Link from 'next/link';

import type { AuthUserContext } from 'next-firebase-auth';

export const NavBar = (props: { user?: AuthUserContext }) => (
  <nav className="flex h-16 items-center justify-between bg-primary px-2 text-white sm:px-6 lg:px-8">
    <p>Logo</p>
    {!props.user?.id && <Link href="/auth">Login</Link>}
    {props.user?.id && <Link href="/">SignOut</Link>}
  </nav>
);
