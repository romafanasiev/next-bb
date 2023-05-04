import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

const Admin = () => (
  <AdminLayout>
    <p>Admin page</p>
  </AdminLayout>
);

export default withAdmin({})(Admin);
