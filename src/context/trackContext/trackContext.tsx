/* eslint-disable max-lines */
import { createContext, useState } from 'react';

import { useTracks } from 'hooks';

import type { PropsWithChildren } from 'react';
import type { TTrack } from 'types';

interface TTrackContext {
  track: TTrack | null;
  isRepeating: boolean;
  isRandom: boolean;
  setNewTrack: (track: TTrack | null) => void;
  setRepeating: () => void;
  setRandom: () => void;
  setRandomTrack: () => void;
  setSkipForward: () => void;
  setSkipBackward: () => void;
}

const inititalState = {
  track: null,
  isRepeating: false,
  isRandom: false,
  setIsRandom: () => null,
  setNewTrack: () => null,
  setRepeating: () => null,
  setRandom: () => null,
  setRandomTrack: () => null,
  setSkipForward: () => null,
  setSkipBackward: () => null,
};

const getTrackIndex = (tracks: TTrack[], id: TTrack['id']) =>
  tracks.findIndex((item) => item.id === id);

export const TrackContext = createContext<TTrackContext>(inititalState);

export const TrackProvider = ({ children }: PropsWithChildren) => {
  const { tracks } = useTracks();
  const [track, setTrack] = useState<TTrackContext['track']>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const minimalReq = tracks && tracks.length >= 2 && track;

  const setNewTrack = (track: TTrack | null) => {
    if (track) {
      setTrack({ ...track });
    } else {
      setTrack(null);
    }
  };

  const setRandom = () => {
    setIsRandom((prev) => !prev);
    setIsRepeating(false);
  };

  const setRandomTrack = () => {
    if (minimalReq) {
      const filteredTracks = tracks.filter((item) => item.id !== track.id);
      const length = filteredTracks?.length - 1;
      const randomNumber = Math.floor(Math.random() * (length - 0 + 1)) + 0;
      setNewTrack(filteredTracks[randomNumber]);
    }
  };

  const setRepeating = () => {
    setIsRepeating((prev) => !prev);
    setIsRandom(false);
  };

  const setSkipForward = () => {
    if (minimalReq) {
      const index = getTrackIndex(tracks, track.id);

      if (index < tracks.length - 1) {
        setNewTrack(tracks[index + 1]);
      } else {
        setNewTrack(tracks[0]);
      }
    }
  };

  const setSkipBackward = () => {
    if (minimalReq) {
      const index = getTrackIndex(tracks, track.id);

      if (index > 0) {
        setNewTrack(tracks[index - 1]);
      } else {
        setNewTrack(tracks[tracks.length - 1]);
      }
    }
  };

  return (
    <TrackContext.Provider
      value={{
        track,
        isRepeating,
        isRandom,
        setNewTrack,
        setRepeating,
        setRandom,
        setRandomTrack,
        setSkipBackward,
        setSkipForward,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
