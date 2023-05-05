import { useState, useLayoutEffect } from 'react';

const queries = [
  '(max-width: 640px)',
  '(min-width: 641px) and (max-width: 1199px)',
  '(min-width: 1200px)',
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
