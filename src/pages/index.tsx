import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';
import { TracksList } from 'components';
import { useTrack, useTracks } from 'hooks';
import { WaveFormPlayer } from 'modules';

import type { TTrack } from 'types';

const Home = () => {
  const { tracks, isLoading } = useTracks();

  const { setNewTrack } = useTrack();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = (track: TTrack) => setNewTrack(track);

  return (
    <MainLayout>
      <WaveFormPlayer />
      <TracksList tracks={tracks} onClick={handleClick} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
