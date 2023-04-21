import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';

const Home = () => (
  <MainLayout>
    <p>Main page</p>
  </MainLayout>
);

export default withAuthUser()(Home);
