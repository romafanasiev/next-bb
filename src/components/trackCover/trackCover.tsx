import Image from 'next/image';
import classNames from 'classnames';

import type { ITrack } from 'types';

type TTrackCoverProps = Pick<ITrack, 'title' | 'coverUrl'> & {
  size?: number;
  rounded?: boolean;
};

export const TrackCover = ({
  title,
  coverUrl,
  size = 44,
  rounded = false,
}: TTrackCoverProps) => {
  const styles = classNames(`object-cover w-[${size}px] h-[${size}px]`, {
    'rounded-lg': rounded,
  });

  return (
    <Image
      className={styles}
      src={coverUrl}
      alt={`${title} track cover`}
      width={size}
      height={size}
    />
  );
};
