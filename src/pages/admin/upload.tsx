import { UploadForm } from 'components';
import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';

import type { TUploadForm } from 'types';

const Upload = () => {
  const onSubmit = (data: TUploadForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <AdminLayout>
      <UploadForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default withAdmin({})(Upload);
