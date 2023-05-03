import { createContext, useState } from 'react';

import type { PropsWithChildren } from 'react';
import type { TTrack } from 'types';

interface TTrackContext {
  track: TTrack | null;
  setNewTrack: (track: TTrack) => void;
}

const inititalState = {
  track: null,
  setNewTrack: () => null,
};

export const TrackContext = createContext<TTrackContext>(inititalState);

export const TrackProvider = ({ children }: PropsWithChildren) => {
  const [track, setTrack] = useState<TTrackContext['track']>(null);

  const setNewTrack = (track: TTrack) => {
    setTrack(track);
  };

  return (
    <TrackContext.Provider value={{ track, setNewTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
