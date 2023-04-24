import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';

const Cart = () => (
  <MainLayout>
    <p>Cart</p>
  </MainLayout>
);

export default withAuthUser()(Cart);
