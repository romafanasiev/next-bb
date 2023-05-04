import type { ArgumentArray } from 'classnames';
import type { IContextType } from 'types';

export const classNamesContext = (
  classes: ((...args: ArgumentArray) => string)[],
  states: IContextType,
) => classes.map((className) => className(states));
