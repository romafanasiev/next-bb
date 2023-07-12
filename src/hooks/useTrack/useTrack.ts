import { useContext } from 'react';

import { TrackContext } from 'context';

export const useTrack = () => {
  const trackContext = useContext(TrackContext);

  return {
    track: trackContext?.track,
    isRepeating: trackContext.isRepeating,
    isRandom: trackContext.isRandom,
    isPlaying: trackContext.isPlaying,
    setIsPlaying: trackContext.handlePlay,
    setNewTrack: trackContext.setNewTrack,
    setRepeating: trackContext.setRepeating,
    setRandom: trackContext.setRandom,
    setRandomTrack: trackContext.setRandomTrack,
    setSkipBackward: trackContext.setSkipBackward,
    setSkipForward: trackContext.setSkipBackward,
  };
};
