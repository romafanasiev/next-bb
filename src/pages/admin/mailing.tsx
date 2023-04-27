import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

const Mailing = () => (
  <AdminLayout>
    <p>Mailing</p>
  </AdminLayout>
);

export default withAdmin({})(Mailing);
