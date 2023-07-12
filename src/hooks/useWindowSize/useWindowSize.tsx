import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [sizes, setSizes] = useState([0, 0]);

  const updateSize = () => {
    if (window) {
      setSizes([window.innerWidth, window.innerHeight]);
    }
  };

  useLayoutEffect(() => {
    if (window) {
      window.addEventListener('resize', updateSize);
    }

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return sizes;
};
