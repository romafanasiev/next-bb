import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

const Update = () => (
  <AdminLayout>
    <p>Update</p>
  </AdminLayout>
);

export default withAdmin({})(Update);
