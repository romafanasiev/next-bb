import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';
import { TracksList } from 'components';
import { useCart, useTrack, useTracks } from 'hooks';
import { WaveFormPlayer } from 'modules';

import type { ITrack } from 'types';
import type { MouseEvent } from 'react';

const Home = () => {
  const { tracks, isLoading } = useTracks();
  const { addToCart } = useCart();
  const { setNewTrack } = useTrack();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = (track: ITrack) => setNewTrack(track);

  const handleAdd = (track: ITrack, e: MouseEvent) => {
    e.stopPropagation();
    addToCart(track);
  };

  return (
    <MainLayout>
      <WaveFormPlayer />
      <TracksList tracks={tracks} onClick={handleClick} handleAdd={handleAdd} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
