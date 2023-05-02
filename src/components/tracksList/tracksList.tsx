import { TrackCard } from 'components';

import type { TTrack } from 'types';

export const TracksList = ({ tracks }: { tracks?: TTrack[] }) => (
  <ul className="flex flex-col gap-4 rounded-3xl bg-primary p-4 text-white">
    {tracks &&
      tracks.map((track, index) => (
        <>
          <TrackCard key={track.id} track={track} />
          {index !== tracks?.length - 1 && <hr />}
        </>
      ))}
  </ul>
);
