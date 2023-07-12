import { collection, limit, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

import { firestore } from 'utils';

import type { CollectionReference } from 'firebase/firestore';
import type { ITrack } from 'types';

export const useTracks = () => {
  const ref = query(
    collection(firestore, 'tracks'),
    // where('exclusive', '==', false),
    limit(20),
  );

  const tracks = useFirestoreQueryData<ITrack>(
    'tracks',
    ref as CollectionReference<ITrack>,
  );

  return { tracks: tracks.data, isLoading: tracks.isLoading };
};
