import { useState } from 'react';
import { Slider } from '@material-tailwind/react';

import MutedIcon from '../../../assets/icons/muted.svg';
import VolumeDownIcon from '../../../assets/icons/volumeDown.svg';
import VolumeUpIcon from '../../../assets/icons/volumeUp.svg';

import type { TPlayerProps } from '../player';
import type { ChangeEvent } from 'react';

export const Volume = ({
  onVolumeChange,
  onMute,
  onUnMute,
}: Pick<TPlayerProps, 'onVolumeChange' | 'onMute' | 'onUnMute'>) => {
  const [volume, setVolume] = useState(50);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(+event.target.value);
    onVolumeChange(+event.target.value);
  };

  const handleVolume = () => {
    if (volume > 0) {
      setVolume(0);
      onMute();
    } else {
      setVolume(50);
      onUnMute();
    }
  };

  return (
    <div className="hidden items-center gap-4 pr-4 text-white md:flex">
      <button onClick={handleVolume}>
        {volume === 0 && <MutedIcon className="h-[24px] w-[24px] fill-white" />}

        {volume > 75 && volume !== 0 && (
          <VolumeUpIcon className="h-[24px] w-[24px] fill-white" />
        )}

        {volume < 75 && volume !== 0 && (
          <VolumeDownIcon className="h-[24px] w-[24px] fill-white" />
        )}
      </button>

      <Slider
        size="sm"
        value={`${volume}`}
        className="min-w-[100px] text-additional"
        onChange={handleChange}
        onVolumeChange={handleChange}
        step={5}
        min={0}
        max={100}
      />
    </div>
  );
};
