import classNames from 'classnames';

import { Portal, TrackCover } from 'components';
import { useMatchMedia } from 'hooks';

import CloseIcon from '../../assets/icons/close.svg';

import { Volume, Controls } from './components';
import {
  buttonColor,
  closeButtonStyles,
  coverWrapperStyles,
  playerWrapperStyles,
} from './styles';

import type { TPlayerProps } from './types';

export const Player = ({
  cover,
  title,
  containerId,
  isPlaying,
  isRandom,
  isRepeating,
  onClose,
  onVolumeChange,
  onRandom,
  skipForward,
  skipBackward,
  onRepeat,
  onPlay,
  onMute,
  onUnMute,
  isOpen,
}: TPlayerProps) => {
  const { isMobile } = useMatchMedia();
  const styles = classNames(playerWrapperStyles, {
    'translate-y-[---eq-size]': isOpen,
    'translate-y-[--eq-size]': !isOpen,
  });

  return (
    <Portal wrapperId={containerId}>
      <div className={styles}>
        <div className={coverWrapperStyles}>
          <TrackCover
            title={title}
            coverUrl={cover}
            size={isMobile ? 70 : 90}
          />
          <span>{title}</span>
        </div>

        <Controls
          isPlaying={isPlaying}
          isRandom={isRandom}
          isRepeating={isRepeating}
          onRepeat={onRepeat}
          onRandom={onRandom}
          onPlay={onPlay}
          skipBackward={skipBackward}
          skipForward={skipForward}
        />

        <Volume
          onVolumeChange={onVolumeChange}
          onMute={onMute}
          onUnMute={onUnMute}
        />

        <button onClick={onClose} className={closeButtonStyles}>
          <CloseIcon className={buttonColor} />
        </button>
      </div>
    </Portal>
  );
};
