import { Portal, TrackCover } from 'components';
import { TContainersIds } from 'types';

interface TPlayerProps {
  cover: string;
  title: string;
  containerId: TContainersIds;
  onClose: () => void;
  onPlay: () => void;
}

export const Player = ({
  cover,
  title,
  containerId,
  onClose,
  onPlay,
}: TPlayerProps) => (
  <Portal wrapperId={containerId}>
    <div className="fixed bottom-0 flex h-[--eq-size] w-full bg-primary text-white md:h-[70px]">
      <TrackCover title={title} coverUrl={cover} size={70} />
      <button onClick={onPlay}>Play</button>
      <button
        onClick={onClose}
        className="absolute right-2 top-1 block h-2 w-2"
      >
        X
      </button>
    </div>
  </Portal>
);
