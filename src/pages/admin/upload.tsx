import { withAdmin } from 'hoc';

const Upload = () => (
  <main className="bg-slate-700 p-10">
    <p>Upload</p>
  </main>
);

export default withAdmin({})(Upload);
