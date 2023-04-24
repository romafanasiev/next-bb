import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';

const Faq = () => (
  <MainLayout>
    <p>Faq</p>
  </MainLayout>
);

export default withAuthUser()(Faq);
