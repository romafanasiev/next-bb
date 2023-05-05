import type { TContainersIds } from 'types';

export const WaveForm = (props: { containerId: TContainersIds }) => (
  <div id={props.containerId} className="relative h-[--eq-size]">
    <div className="absolute bottom-0 h-3/6 w-full bg-additional z-10 opacity-70" />
  </div>
);
