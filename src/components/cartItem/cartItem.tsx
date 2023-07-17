import { TrackCover } from 'components';

import type { TCartItem } from 'types';

export const CartItem = ({
  price,
  coverUrl,
  title,
}: Omit<TCartItem, 'id' | 'version'>) => (
  <div className="flex items-center gap-2">
    <TrackCover coverUrl={coverUrl} title={title} rounded />
    <div className="flex flex-col">
      <span>{title}</span>
      <span>{price}.00$</span>
    </div>
  </div>
);
