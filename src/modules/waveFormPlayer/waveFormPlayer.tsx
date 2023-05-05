import { useEffect, useState } from 'react';

import { Player, WaveForm } from 'components';
import { useTrack, useWavesurfer } from 'hooks';
import { containersIds } from '@constants';

const { progressBar, player } = containersIds;

export const WaveFormPlayer = () => {
  const { track } = useTrack();
  const { playPause } = useWavesurfer(progressBar, track?.demoUrl);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (track) {
      setIsOpen(true);
    }
  }, [track]);

  const handleClosePlayer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <WaveForm containerId={progressBar} />
      {track && (
        <Player
          isOpen={isOpen}
          cover={track.coverUrl}
          title={track.title}
          containerId={player}
          onClose={handleClosePlayer}
          onPlay={playPause}
        />
      )}
    </>
  );
};
