import { Badge, TrackCover } from 'components';

import type { TTrack } from 'types';

const cellPaddings = 'px-6 py-4';
const cellStyles = `${cellPaddings} hidden md:table-cell`;

export const TrackCard = ({ track }: { track: TTrack }) => {
  const { coverUrl, title, tags, bpm, standardPrice, duration, key } = track;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  const tagsList = tags.split(',');

  return (
    <tr className="cursor-pointer border-b border-b-white last:border-b-0 hover:bg-additional hover:bg-opacity-30">
      <td className="w-[64px] rounded-sm pl-[20px]">
        <TrackCover coverUrl={coverUrl} title={title} />
      </td>
      <th scope="row" className={`${cellPaddings.split(' ')[0]} capitalize`}>
        {title}
      </th>
      <td className={cellStyles}>{`${minutes}:${seconds}`}</td>
      <td className={cellStyles}>{bpm}</td>
      <td className={`${cellStyles} text-center`}>{key}</td>
      <td
        className={`${cellPaddings} hidden flex-wrap items-center justify-center gap-2 md:flex`}
      >
        {tagsList.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </td>
      <td className={`${cellPaddings} text-end`}>
        <button>{standardPrice}$</button>
      </td>
    </tr>
  );
};
