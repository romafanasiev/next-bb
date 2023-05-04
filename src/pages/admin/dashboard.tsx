import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

const Dashboard = () => (
  <AdminLayout>
    <p>Dashboard</p>
  </AdminLayout>
);

export default withAdmin({})(Dashboard);
