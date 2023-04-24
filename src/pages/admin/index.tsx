import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth';

import { protectedPages } from 'helpers';

const Admin = () => (
  <main className="bg-slate-700 p-10">
    <p>Admin page</p>
  </main>
);

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => await protectedPages(AuthUser));

export default withAuthUser()(Admin);
