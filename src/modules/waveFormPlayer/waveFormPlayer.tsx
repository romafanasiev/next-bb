import { useEffect, useState } from 'react';

import { Player, WaveForm } from 'components';
import { useTrack, useWavesurfer } from 'hooks';
import { containersIds } from '@constants';

const { progressBar, player } = containersIds;

export const WaveFormPlayer = () => {
  const { track } = useTrack();
  const { playPause, setVolume, muteVolume, unMuteVolume } = useWavesurfer(
    progressBar,
    track?.demoUrl,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (track) {
      setIsOpen(true);
      setIsPlaying(true);
    }
  }, [track]);

  const handleClosePlayer = () => {
    setIsOpen(false);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    playPause();
  };

  return (
    <>
      <WaveForm containerId={progressBar} />
      {track && (
        <Player
          isPlaying={isPlaying}
          isOpen={isOpen}
          cover={track.coverUrl}
          title={track.title}
          containerId={player}
          onClose={handleClosePlayer}
          onVolumeChange={setVolume}
          onPlay={handlePlayPause}
          onMute={muteVolume}
          onUnMute={unMuteVolume}
        />
      )}
    </>
  );
};
