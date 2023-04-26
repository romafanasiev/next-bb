import { withAdmin } from 'hoc';

const Update = () => (
  <main className="bg-slate-700 p-10">
    <p>Update</p>
  </main>
);

export default withAdmin({})(Update);
