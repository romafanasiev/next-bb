import type { TContainersIds } from 'types';

export const WaveForm = (props: { containerId: TContainersIds }) => (
  <div
    id={props.containerId}
    className="relative h-[--eq-size] after:absolute
      after:bottom-0 after:z-10 after:block after:h-3/6
      after:w-full after:bg-additional after:opacity-70 after:content-['']"
  />
);
