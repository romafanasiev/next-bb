import { TrackCover } from 'components';

import type { TTrack } from 'types';

export const TrackCard = ({ track }: { track: TTrack }) => {
  const { coverUrl, title, tags, bpm, standardPrice } = track;

  return (
    <li className="flex h-[--track-height] items-center gap-2">
      <TrackCover coverUrl={coverUrl} title={title} />
      <span>{title}</span>
      <span>{tags}</span>
      <span>{bpm}</span>
      <button>{standardPrice}$</button>
    </li>
  );
};
