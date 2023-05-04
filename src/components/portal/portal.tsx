import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { createWrapperAppendToBody } from 'helpers';

import type { TContainersIds } from 'types';

type TPortal = PropsWithChildren & {
  wrapperId: TContainersIds;
};

export const Portal = ({ children, wrapperId }: TPortal) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) {
    return null;
  }

  return createPortal(children, wrapperElement);
};
