import { Player, WaveForm } from 'components';
import { useTrack, useWavesurfer } from 'hooks';
import { containersIds } from '@constants';

const { progressBar, player } = containersIds;

export const WaveFormPlayer = () => {
  const { track, setNewTrack } = useTrack();
  const { playPause } = useWavesurfer(progressBar, track?.demoUrl);

  const handleClosePlayer = () => {
    setNewTrack(null);
  };

  return (
    <>
      <WaveForm containerId={progressBar} />
      {track && (
        <Player
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
