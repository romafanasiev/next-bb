import { useContext } from 'react';

import { TrackContext } from 'context';

export const useTrack = () => {
  const trackContext = useContext(TrackContext);

  return { track: trackContext?.track, setNewTrack: trackContext?.setNewTrack };
};
