import { useAuthUser } from 'next-firebase-auth';

export const NavBar = () => {
  const user = useAuthUser();

  return (
    <nav className="flex h-16 items-center justify-between bg-primary px-2 text-white sm:px-6 lg:px-8">
      <p>Logo</p>
      {user.claims.admin && <p>Hello Admin</p>}
      {/* {!props.user?.id && <Link href="/auth">Login</Link>}
    {props.user?.id && <Link href="/">SignOut</Link>} */}
    </nav>
  );
};
