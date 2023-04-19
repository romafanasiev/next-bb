import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth';

const Users = () => {
  const AuthUser = useAuthUser();

  return (
    <main className="bg-slate-700 p-10">
      <p>{AuthUser.email}</p>
    </main>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Users);

