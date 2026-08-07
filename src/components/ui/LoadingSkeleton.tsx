import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'circle';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'card',
  count = 1,
}) => {
  const variantStyles = {
    card: 'h-32 w-full rounded-cards bg-canvas border border-hairline',
    text: 'h-4 w-3/4 rounded-md bg-canvas',
    avatar: 'h-10 w-10 rounded-full bg-canvas',
    circle: 'h-24 w-24 rounded-full bg-canvas',
  };

  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className={cn('animate-shimmer overflow-hidden relative', variantStyles[variant], className)}
        />
      ))}
    </>
  );
};
