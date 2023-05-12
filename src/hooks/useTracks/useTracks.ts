import { collection, limit, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

import { firestore } from 'utils';

import type { CollectionReference } from 'firebase/firestore';
import type { TTrack } from 'types';

export const useTracks = () => {
  const ref = query(
    collection(firestore, 'tracks'),
    // where('exclusive', '==', false),
    limit(20),
  );

  const tracks = useFirestoreQueryData<TTrack>(
    'tracks',
    ref as CollectionReference<TTrack>,
  );

  return { tracks: tracks.data, isLoading: tracks.isLoading };
};
