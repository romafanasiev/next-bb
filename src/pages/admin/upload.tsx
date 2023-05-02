import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { collection } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';

import { UploadForm } from 'components';
import { withAdmin } from 'hoc';
import { AdminLayout } from 'layouts';
import { firestore } from 'utils';
import { uploadTrack } from 'api';

import type { TUploadForm } from 'types';

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const reference = collection(firestore, 'tracks');
  const mutation = useFirestoreCollectionMutation(reference, {
    onSuccess() {
      toast.success('Track successfully uploaded');
      setProgress(0);
    },
  });

  const onSubmit = async (data: TUploadForm) => {
    try {
      const res = await uploadTrack(data, (progress: number) =>
        setProgress(progress),
      );
      mutation.mutate(res);
    } catch (error) {
      toast.error('error');
    }
  };

  return (
    <AdminLayout>
      <UploadForm onSubmit={onSubmit} />
      {progress > 0 && <p>{`Please wait loading ${progress}%`}</p>}
    </AdminLayout>
  );
};

export default withAdmin({})(Upload);
