import { withAuthUser } from 'next-firebase-auth';
import { collection, limit, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

import { MainLayout } from 'layouts';
import { firestore } from 'utils';
import { TracksList } from 'components';

import type { CollectionReference } from 'firebase/firestore';
import type { TTrack } from 'types';

const Home = () => {
  const ref = query(
    collection(firestore, 'tracks'),
    // where('exclusive', '==', false),
    limit(20),
  );

  const tracks = useFirestoreQueryData<TTrack>(
    'tracks',
    ref as CollectionReference<TTrack>,
  );

  if (tracks.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <MainLayout>
      <TracksList tracks={tracks.data} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
