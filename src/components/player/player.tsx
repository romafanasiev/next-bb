
import { containersIds } from '@constants';
import { Portal, TrackCover } from 'components';
import { useTrack } from 'hooks';

export const Player = () => {
  const { track, setNewTrack } = useTrack();

  if (!track) {
    return null;
  }

  const { coverUrl, title } = track;

  return (
    <Portal wrapperId={containersIds.player}>
      <div className="fixed bottom-0 flex h-[58px] w-full bg-primary text-white md:h-[70px]">
        <TrackCover title={title} coverUrl={coverUrl} size={70} />
        <p>Player</p>
        <button onClick={() => setNewTrack(null)}>X</button>
      </div>
    </Portal>
  );
};
