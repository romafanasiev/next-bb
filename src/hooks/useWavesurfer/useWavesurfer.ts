import { useEffect, useRef } from 'react';

import { TContainersIds } from 'types';

import { containerProps } from './styles';

export const useWavesurfer = (
  container: TContainersIds,
  setNextTrack: () => void,
  isRepeating?: boolean,
  isRandom?: boolean,
  setNextRandomTrack?: () => void,
  url?: string,
) => {
  const wavesurfer = useRef<WaveSurfer | null>(null);

  const handleFinish = () => {
    wavesurfer.current?.on('finish', () => {
      if (isRepeating) {
        wavesurfer.current?.seekTo(0);
        wavesurfer.current?.play();
      } else if (isRandom && setNextRandomTrack) {
        setNextRandomTrack();
      } else {
        setNextTrack();
      }
    });
  };

  const create = async (wrapper: TContainersIds, trackUrl?: string) => {
    if (trackUrl) {
      const WaveSurfer = (await import('wavesurfer.js')).default;
      const options = containerProps(wrapper);
      wavesurfer.current = WaveSurfer.create(options);
      wavesurfer.current?.load(trackUrl);
      wavesurfer.current?.on('ready', () => {
        wavesurfer.current?.play();
      });

      handleFinish();
    }
  };

  const handlePlayPause = () => {
    wavesurfer.current?.playPause();
  };

  const handleMute = () => {
    wavesurfer.current?.toggleMute();
  };

  const handleUnMute = () => {
    wavesurfer.current?.setMute(false);
    wavesurfer.current?.setVolume(0.5);
  };

  const handleSetVolume = (value: number) => {
    if (value === 0) {
      handleMute();
    } else {
      handleUnMute();
    }

    if (value > 1) {
      wavesurfer.current?.setVolume(value / 100);
    } else if (value > 0 && value < 1) {
      wavesurfer.current?.setVolume(value);
    }
  };

  useEffect(() => {
    wavesurfer.current?.unAll();
    handleFinish();
  }, [isRepeating, isRandom]);

  useEffect(() => {
    create(container, url);

    return () => wavesurfer.current?.destroy();
  }, [url]);

  return {
    playPause: handlePlayPause,
    setVolume: handleSetVolume,
    muteVolume: handleMute,
    unMuteVolume: handleUnMute,
  };
};
