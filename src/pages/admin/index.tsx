import { withAdmin } from 'hoc';

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

export default withAdmin({})(Admin);
