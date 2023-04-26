import { withAdmin } from 'hoc';

const Mailing = () => (
  <main className="bg-slate-700 p-10">
    <p>Mailing</p>
  </main>
);

export default withAdmin({})(Mailing);
