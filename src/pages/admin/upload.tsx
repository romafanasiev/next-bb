import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth';

import { protectedPages } from 'helpers';

const Upload = () => (
  <main className="bg-slate-700 p-10">
    <p>Upload</p>
  </main>
);

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(({ AuthUser }) => protectedPages(AuthUser));

export default withAuthUser()(Upload);
