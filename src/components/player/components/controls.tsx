import classNames from 'classnames';

import PlayIcon from '../../../assets/icons/play.svg';
import StopIcon from '../../../assets/icons/stop.svg';
import ShuffleIcon from '../../../assets/icons/shuffle.svg';
import RepeatIcon from '../../../assets/icons/repeat.svg';
import SkipForwardIcon from '../../../assets/icons/skipForward.svg';
import SkipBackwardIcon from '../../../assets/icons/skipBackward.svg';
import {
  buttonColor,
  controlsWrapperStyles,
  playButtonStyles,
  skipButtonStyles,
  subButtonStyles,
} from '../styles';

import type { TControlsProps } from '../types';

export const Controls = ({
  isRepeating,
  isPlaying,
  isRandom,
  onRepeat,
  onRandom,
  onPlay,
  skipBackward,
  skipForward,
}: TControlsProps) => {
  const shuffleButtonStyles = classNames(subButtonStyles, {
    'fill-error': isRandom,
    [buttonColor]: !isRandom,
  });
  const repeatButtonStyles = classNames(subButtonStyles, {
    'fill-error': isRepeating,
    [buttonColor]: !isRepeating,
  });

  return (
    <div className={controlsWrapperStyles}>
      <button onClick={onRepeat} className={repeatButtonStyles}>
        <RepeatIcon />
      </button>

      <button onClick={skipBackward} className={skipButtonStyles}>
        <SkipBackwardIcon />
      </button>

      <button onClick={onPlay} className={playButtonStyles}>
        {!isPlaying ? <PlayIcon /> : <StopIcon />}
      </button>

      <button onClick={skipForward} className={skipButtonStyles}>
        <SkipForwardIcon />
      </button>

      <button onClick={onRandom} className={shuffleButtonStyles}>
        <ShuffleIcon />
      </button>
    </div>
  );
};
