import { withAuthUser } from 'next-firebase-auth';
import { collection, limit, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

import { MainLayout } from 'layouts';
import { firestore } from 'utils';
import { TracksList } from 'components';
import { useTrack } from 'hooks';
import { WaveFormPlayer } from 'modules';

import type { CollectionReference } from 'firebase/firestore';
import type { TTrack } from 'types';

const Home = () => {
  const ref = query(
    collection(firestore, 'tracks'),
    // where('exclusive', '==', false),
    limit(20),
  );

  const { setNewTrack } = useTrack();

  const tracks = useFirestoreQueryData<TTrack>(
    'tracks',
    ref as CollectionReference<TTrack>,
  );

  if (tracks.isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = (track: TTrack) => setNewTrack(track);

  return (
    <MainLayout>
      <WaveFormPlayer />
      <TracksList tracks={tracks.data} onClick={handleClick} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
