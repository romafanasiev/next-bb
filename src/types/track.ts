export interface ITrack {
  id: string;
  coverUrl: string;
  demoUrl: string;
  title: string;
  tags: string;
  bpm: number;
  standardPrice: number;
  premiumPrice: number;
  key: string;
  exclusive: boolean;
  duration: number;
}

export type TCartItem = Pick<ITrack, 'id' | 'coverUrl' | 'title'> & {
  price: number;
};
