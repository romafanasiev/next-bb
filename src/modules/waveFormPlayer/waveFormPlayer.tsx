import { useEffect, useState } from 'react';

import { Player, WaveForm } from 'components';
import { useTrack, useWavesurfer } from 'hooks';
import { containersIds } from '@constants';

const { progressBar, player } = containersIds;

export const WaveFormPlayer = () => {
  const {
    track,
    setRepeating,
    isRepeating,
    isRandom,
    isPlaying,
    setIsPlaying,
    setRandom,
    setRandomTrack,
    setSkipForward,
    setSkipBackward,
  } = useTrack();
  const { playPause, setVolume, muteVolume, unMuteVolume } = useWavesurfer(
    progressBar,
    setSkipForward,
    isRepeating,
    isRandom,
    setRandomTrack,
    track?.demoUrl,
  );
  const [isOpen, setIsOpen] = useState(false);

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
    setIsPlaying(!isPlaying);
    playPause();
  };

  return (
    <>
      <WaveForm containerId={progressBar} />
      {track && (
        <Player
          isPlaying={isPlaying}
          isRepeating={isRepeating}
          isRandom={isRandom}
          isOpen={isOpen}
          cover={track.coverUrl}
          title={track.title}
          containerId={player}
          onClose={handleClosePlayer}
          onVolumeChange={setVolume}
          onPlay={handlePlayPause}
          onMute={muteVolume}
          onUnMute={unMuteVolume}
          onRandom={setRandom}
          skipForward={setSkipForward}
          skipBackward={setSkipBackward}
          onRepeat={setRepeating}
        />
      )}
    </>
  );
};
