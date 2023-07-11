import { Badge, Button, TrackCover } from 'components';

import AddToCart from '../../assets/icons/addToCart.svg';

import type { ITrack } from 'types';

const cellPaddings = 'px-3 py-2 md:px-6 md:py-4';
const cellStyles = `${cellPaddings} hidden md:table-cell`;

export const TrackCard = ({
  track,
  onClick,
  handleAdd,
}: {
  track: ITrack;
  onClick?: (track: ITrack) => void;
  handleAdd?: (
    track: ITrack,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}) => {
  const { coverUrl, title, tags, bpm, standardPrice, duration, key } = track;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  const tagsList = tags.split(',');

  return (
    <tr
      className="cursor-pointer border-b border-b-white last:border-b-0 hover:bg-additional hover:bg-opacity-30"
      onClick={() => {
        onClick?.(track);
      }}
    >
      <td className="w-[64px] min-w-[64px] rounded-sm pl-[20px]">
        <TrackCover coverUrl={coverUrl} title={title} rounded />
      </td>
      <th scope="row" className={`${cellPaddings.split(' ')[0]} capitalize`}>
        {title}
      </th>
      <td className={cellStyles}>{`${minutes}:${seconds}`}</td>
      <td className={cellStyles}>{bpm}</td>
      <td className={`${cellStyles} text-center`}>{key}</td>
      <td className="hidden h-full flex-wrap items-center justify-center gap-2 px-6 py-6 md:flex">
        {tagsList.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </td>
      <td className={`${cellPaddings} z-50 text-end`}>
        <Button variant="secondary" onClick={(e) => handleAdd?.(track, e)}>
          <span className="flex items-center gap-2">
            <AddToCart />
            {standardPrice}.00$
          </span>
        </Button>
      </td>
    </tr>
  );
};
