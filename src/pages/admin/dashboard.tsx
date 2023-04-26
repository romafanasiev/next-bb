import { withAdmin } from 'hoc';

const Dashboard = () => (
  <main className="bg-slate-700 p-10">
    <p>Dashboard</p>
  </main>
);

export default withAdmin({})(Dashboard);
