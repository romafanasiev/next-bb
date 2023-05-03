import type { PropsWithChildren } from 'react';

export const Badge = (props: PropsWithChildren) => (
  <span className="max-h-[40px] min-w-max rounded-full bg-additional px-2.5 py-0.5 text-xs text-primary">
    {props.children}
  </span>
);
