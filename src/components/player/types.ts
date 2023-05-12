import { TContainersIds } from 'types';

export interface TControlsProps {
  isPlaying: boolean;
  isRepeating: boolean;
  isRandom: boolean;
  onRepeat: () => void;
  onRandom: () => void;
  onPlay: () => void;
  skipForward: () => void;
  skipBackward: () => void;
}

export interface TVolumeProps {
  onMute: () => void;
  onUnMute: () => void;
  onVolumeChange: (value: number) => void;
}

export type TPlayerProps = TControlsProps &
  TVolumeProps & {
    cover: string;
    title: string;
    containerId: TContainersIds;
    onClose: () => void;
    onMute: () => void;
    onUnMute: () => void;
    onVolumeChange: (value: number) => void;
    isOpen: boolean;
  };
