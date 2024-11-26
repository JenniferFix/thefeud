import React from 'react';
import StrikeSvg from '@/components/StrikeSvg';
import { cn } from '@/utils/utils';

const Strikes = ({
  strikes,
  className,
}: {
  strikes: number;
  className: string;
}) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <StrikeSvg
        className={cn('h-8', strikes >= 1 ? 'opacity-100' : 'opacity-25')}
      />
      <StrikeSvg
        className={cn('h-8', strikes >= 2 ? 'opacity-100' : 'opacity-25')}
      />
      <StrikeSvg
        className={cn('h-8', strikes >= 3 ? 'opacity-100' : 'opacity-25')}
      />
    </div>
  );
};

export default Strikes;
