import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

const Admin = () => (
  <main className="bg-slate-700 p-10">
    <p>Admin page</p>
  </main>
);

// export const getServerSideProps = withAuthUserSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })(({ AuthUser }) => {

//   if (AuthUser.claims.admin) {
//     return { props: { data: 'hello Admin' } };
//   }

//   return { props: { data: null } };
// });

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  // eslint-disable-next-line require-await
})(async ({ AuthUser }) => {
  if (!AuthUser.claims.admin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  return { props: {} };
});

export default withAuthUser()(Admin);
