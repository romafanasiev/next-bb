import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';

const Home = () => {
  const authUser = useAuthUser();

  console.log(authUser);

  return (
    <MainLayout>
      <p>Main page</p>
    </MainLayout>
  );
};
// PAuDWBKYH9fXPOgot1q7kdLARW82
// PAuDWBKYH9fXPOgot1q7kdLARW;
export default withAuthUser()(Home);
