import classNames from 'classnames';

import { Portal, TrackCover } from 'components';
import { useMatchMedia } from 'hooks';

import CloseIcon from '../../assets/icons/close.svg';
import PlayIcon from '../../assets/icons/play.svg';
import StopIcon from '../../assets/icons/stop.svg';
import ShuffleIcon from '../../assets/icons/shuffle.svg';
import RepeatIcon from '../../assets/icons/repeat.svg';
import SkipForwardIcon from '../../assets/icons/skipForward.svg';
import SkipBackwardIcon from '../../assets/icons/skipBackward.svg';

import { Volume } from './components';
import {
  buttonColor,
  closeButtonStyles,
  controlsWrapperStyles,
  coverWrapperStyles,
  playButtonStyles,
  playerWrapperStyles,
  skipButtonStyles,
  subButtonStyles,
} from './styles';

import type { TContainersIds } from 'types';

export interface TPlayerProps {
  cover: string;
  title: string;
  containerId: TContainersIds;
  isPlaying: boolean;
  onClose: () => void;
  onPlay: () => void;
  onMute: () => void;
  onUnMute: () => void;
  onVolumeChange: (value: number) => void;
  isOpen: boolean;
}

export const Player = ({
  cover,
  title,
  containerId,
  isPlaying,
  onClose,
  onVolumeChange,
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

        <div className={controlsWrapperStyles}>
          <RepeatIcon className={subButtonStyles} />
          <SkipBackwardIcon className={skipButtonStyles} />

          <button onClick={onPlay}>
            {!isPlaying ? (
              <PlayIcon className={playButtonStyles} />
            ) : (
              <StopIcon className={playButtonStyles} />
            )}
          </button>

          <SkipForwardIcon className={skipButtonStyles} />
          <ShuffleIcon className={subButtonStyles} />
        </div>

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
