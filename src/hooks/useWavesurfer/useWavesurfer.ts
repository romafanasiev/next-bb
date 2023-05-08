import { useEffect, useRef } from 'react';

import { TContainersIds } from 'types';

import { containerProps } from './styles';

export const useWavesurfer = (container: TContainersIds, url?: string) => {
  const wavesurfer = useRef<WaveSurfer | null>(null);

  const create = async (wrapper: TContainersIds, trackUrl?: string) => {
    if (trackUrl) {
      const WaveSurfer = (await import('wavesurfer.js')).default;
      const options = containerProps(wrapper);
      wavesurfer.current = WaveSurfer.create(options);
      wavesurfer.current?.load(trackUrl);
      wavesurfer.current?.on('ready', function () {
        wavesurfer.current?.play();
      });
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
    create(container, url);

    return () => wavesurfer.current?.destroy();
  }, [url, container]);

  return {
    playPause: handlePlayPause,
    setVolume: handleSetVolume,
    muteVolume: handleMute,
    unMuteVolume: handleUnMute,
  };
};
