import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';
import { TracksList } from 'components';
import { useTrack, useTracks } from 'hooks';
import { WaveFormPlayer } from 'modules';
import { useStore } from 'store';

import type { ITrack } from 'types';
import type { MouseEvent } from 'react';

const Home = () => {
  const { tracks, isLoading } = useTracks();
  const addToCart = useStore.use.addToCart();
  const cart = useStore.use.cart();

  const { setNewTrack } = useTrack();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = (track: ITrack) => setNewTrack(track);

  const handleAdd = (track: ITrack, e: MouseEvent) => {
    e.stopPropagation();
    addToCart(track);
    console.log(cart);
  };

  return (
    <MainLayout>
      <WaveFormPlayer />
      <TracksList tracks={tracks} onClick={handleClick} handleAdd={handleAdd} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
