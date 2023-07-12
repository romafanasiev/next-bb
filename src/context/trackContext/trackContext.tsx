/* eslint-disable max-lines */
import { createContext, useState } from 'react';

import { useTracks } from 'hooks';

import type { PropsWithChildren } from 'react';
import type { ITrack } from 'types';

interface ITrackContext {
  track: ITrack | null;
  isRepeating: boolean;
  isRandom: boolean;
  isPlaying: boolean;
  handlePlay: (value: boolean) => void;
  setNewTrack: (track: ITrack | null) => void;
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
  isPlaying: false,
  handlePlay: () => null,
  setIsRandom: () => null,
  setNewTrack: () => null,
  setRepeating: () => null,
  setRandom: () => null,
  setRandomTrack: () => null,
  setSkipForward: () => null,
  setSkipBackward: () => null,
};

const getTrackIndex = (tracks: ITrack[], id: ITrack['id']) =>
  tracks.findIndex((item) => item.id === id);

export const TrackContext = createContext<ITrackContext>(inititalState);

export const TrackProvider = ({ children }: PropsWithChildren) => {
  const { tracks } = useTracks();
  const [track, setTrack] = useState<ITrackContext['track']>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const minimalReq = tracks && tracks.length >= 2 && track;

  const setNewTrack = (track: ITrack | null) => {
    if (track) {
      setTrack({ ...track });
    } else {
      setTrack(null);
    }
  };

  const handlePlay = (value: boolean) => {
    setIsPlaying(value);
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
        isPlaying,
        handlePlay,
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
