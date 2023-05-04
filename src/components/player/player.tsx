import classNames from 'classnames';

import { Portal, TrackCover } from 'components';

import CloseIcon from '../../assets/icons/close.svg';

import type { TContainersIds } from 'types';

interface TPlayerProps {
  cover: string;
  title: string;
  containerId: TContainersIds;
  onClose: () => void;
  onPlay: () => void;
  isOpen: boolean;
}

export const Player = ({
  cover,
  title,
  containerId,
  onClose,
  onPlay,
  isOpen,
}: TPlayerProps) => {
  const styles = classNames(
    'fixed bottom-0 flex h-[--eq-sm-size] w-full items-center justify-between bg-primary text-white sm:h-[--eq-size]',
    {
      'translate-y-[---eq-size]': isOpen,
      'translate-y-[--eq-size]': !isOpen,
    },
  );

  return (
    <Portal wrapperId={containerId}>
      <div className={styles}>
        <div className="flex items-center gap-4 capitalize">
          <TrackCover title={title} coverUrl={cover} size={70} />
          <span>{title}</span>
        </div>
        <div className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%]">
          <button onClick={onPlay}>Play</button>
        </div>
        <div>Volume</div>
        <button
          onClick={onClose}
          className="absolute right-2 top-1 block h-6 w-6"
        >
          <CloseIcon className="fill-white" />
        </button>
      </div>
    </Portal>
  );
};
