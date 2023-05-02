import { TrackCover } from 'components';

import type { TTrack } from 'types';

export const TrackCard = ({ track }: { track: TTrack }) => {
  const { coverUrl, title, tags, bpm, standardPrice, duration } = track;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  return (
    <tr>
      <td>
        <TrackCover coverUrl={coverUrl} title={title} />
      </td>
      <th scope="row" className="px-6 capitalize">
        {title}
      </th>
      <td className="px-6 py-4">{`${minutes}:${seconds}`}</td>
      <td className="px-6 py-4">{bpm}</td>
      <td className="px-6 py-4">{tags}</td>
      <td className="px-6 py-4">
        <button>{standardPrice}$</button>
      </td>
    </tr>
  );
};
