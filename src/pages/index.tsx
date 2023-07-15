import { withAuthUser } from 'next-firebase-auth';
import Spinner from '@material-tailwind/react/components/Spinner';

import { MainLayout } from 'layouts';
import { TracksList } from 'components';
import { useCart, useTrack, useTracks } from 'hooks';
import { WaveFormPlayer } from 'modules';
import { tracksVersions } from '@constants';

import type { ITrack } from 'types';
import type { MouseEvent } from 'react';

const Home = () => {
  const { tracks, isLoading } = useTracks();
  const { addToCart } = useCart();
  const { setNewTrack } = useTrack();

  if (isLoading) {
    return (
      <div className="flex h-[100vh]">
        <Spinner className="m-auto h-12 w-12" />
      </div>
    );
  }

  const handleClick = (track: ITrack) => setNewTrack(track);

  const handleAdd = (track: ITrack, e: MouseEvent) => {
    const { id, coverUrl, standardPrice, title } = track;
    e.stopPropagation();
    addToCart({
      id,
      coverUrl,
      title,
      price: standardPrice,
      version: tracksVersions.standart,
    });
  };

  return (
    <MainLayout>
      <WaveFormPlayer />
      <TracksList tracks={tracks} onClick={handleClick} handleAdd={handleAdd} />
    </MainLayout>
  );
};

export default withAuthUser()(Home);
