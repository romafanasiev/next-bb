import type { TContainersIds } from 'types';

export const containerProps = (container: TContainersIds) => {
  return {
    container: `#${container}`,
    waveColor: '#fff',
    progressColor: '#d32f2f',
    barWidth: 3,
    barRadius: 2,
    hideScrollbar: true,
    responsive: true,
    skipLength: 10,
    height: 90,
    cursorColor: 'transparent',
    reflection: true,
  };
};
