import { TrackCard } from 'components';

import type { TTrack } from 'types';

const cellPaddings = 'px-6 py-3';
const cellStyles = `${cellPaddings} hidden md:table-cell`;

export const TracksList = ({
  tracks,
  onClick,
}: {
  tracks?: TTrack[];
  onClick?: (track: TTrack) => void;
}) => (
  <div className="rounded-3xl bg-primary py-4 text-white">
    <table className="w-full text-left text-sm ">
      <thead className="border-b border-b-white text-xs uppercase">
        <tr>
          <th scope="col" className={`${cellPaddings.split(' ')[1]}`} />
          <th scope="col" className={cellPaddings}>
            Title
          </th>
          <th scope="col" className={cellStyles}>
            Time
          </th>
          <th scope="col" className={cellStyles}>
            Bpm
          </th>
          <th scope="col" className={`${cellStyles} text-center`}>
            Key
          </th>
          <th scope="col" className={`${cellStyles} text-center`}>
            Tags
          </th>
          <th scope="col" className={cellPaddings} />
        </tr>
      </thead>
      <tbody>
        {tracks &&
          tracks.map((track) => (
            <TrackCard key={track.id} track={track} onClick={onClick} />
          ))}
      </tbody>
    </table>
  </div>
);
