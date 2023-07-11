import { useState, useLayoutEffect } from 'react';

import { breakpoints } from '@constants';

const { tablet, desktop, largeDesktop } = breakpoints;

const queries = [
  `(max-width: ${tablet}px)`,
  `(min-width: ${tablet + 1}px) and (max-width: ${desktop - 1})`,
  `(min-width: ${largeDesktop}px)`,
];

interface TMatchedMedia {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));
  const getValues = mediaQueryLists.map((mql) => mql.matches);
  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));

    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handler),
      );
  });

  return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => {
    return {
      ...acc,
      [screen]: values[index],
    };
  }, {}) as TMatchedMedia;
};
