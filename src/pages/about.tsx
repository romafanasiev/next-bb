import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';

const About = () => (
  <MainLayout>
    <p>About</p>
  </MainLayout>
);

export default withAuthUser()(About);
