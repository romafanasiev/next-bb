import { Badge, Button, TrackCover } from 'components';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <circle cx="10.5" cy="19.5" r="1.5"></circle>
              <circle cx="17.5" cy="19.5" r="1.5"></circle>
              <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
              <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
            </svg>
            {standardPrice}.00$
          </span>
        </Button>
      </td>
    </tr>
  );
};
