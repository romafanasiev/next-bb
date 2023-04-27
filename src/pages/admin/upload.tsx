import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

const Upload = () => (
  <AdminLayout>
    <p>Upload</p>
  </AdminLayout>
);

export default withAdmin({})(Upload);
