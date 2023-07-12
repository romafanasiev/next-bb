import type { PropsWithChildren } from 'react';

interface IndicatorProps extends PropsWithChildren {
  count: number;
}

export const Indicator: React.FC<IndicatorProps> = ({ children, count }) => (
  <div className="relative">
    {!!count && (
      <div className="absolute right-[-8px] top-[-8px] inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-additional text-xs font-bold text-primary">
        {count}
      </div>
    )}
    {children}
  </div>
);
