import Image from 'next/image';

import type { TTrack } from 'types';

export const TrackCover = ({
  title,
  coverUrl,
}: Pick<TTrack, 'title' | 'coverUrl'>) => (
  <Image
    className="h-[--cover-size] rounded-lg object-cover"
    src={coverUrl}
    alt={`${title} track cover`}
    width={44}
    height={44}
  />
);
