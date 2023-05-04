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
    }
  };

  const handlePlayPause = () => {
    wavesurfer.current?.playPause();
  };

  useEffect(() => {
    create(container, url);

    return () => wavesurfer.current?.destroy();
  }, [url, container]);

  return { playPause: handlePlayPause };
};
