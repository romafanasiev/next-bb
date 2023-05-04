import type { TContainersIds } from 'types';

export const createWrapperAppendToBody = (wrapperId: TContainersIds) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
};
