import { TrackCard } from 'components';

import type { TTrack } from 'types';

export const TracksList = ({ tracks }: { tracks?: TTrack[] }) => (
  <div className="rounded-3xl bg-primary p-4 text-white">
    <table className="w-full text-left text-sm ">
      <thead className="text-xs uppercase">
        <tr>
          <th scope="col" className="py-3" />
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Time
          </th>
          <th scope="col" className="px-6 py-3">
            Bpm
          </th>
          <th scope="col" className="px-6 py-3">
            Tags
          </th>
          <th scope="col" className="px-6 py-3" />
        </tr>
      </thead>
      <tbody>
        {tracks &&
          tracks.map((track) => <TrackCard key={track.id} track={track} />)}
      </tbody>
    </table>
  </div>
);
