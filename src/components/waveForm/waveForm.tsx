import type { TContainersIds } from 'types';

export const WaveForm = (props: { containerId: TContainersIds }) => (
  <div id={props.containerId} className="h-[--eq-size]" />
);
