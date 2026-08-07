import React from 'react';
import { cn } from '../../utils/cn';

interface DividerProps {
  className?: string;
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ className, label }) => {
  if (label) {
    return (
      <div className={cn('relative flex items-center justify-center my-4', className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-hairline" />
        </div>
        <div className="relative px-3 bg-paper text-xs font-medium text-mid-gray uppercase tracking-caption font-geist">
          {label}
        </div>
      </div>
    );
  }

  return <hr className={cn('border-t border-hairline my-4', className)} />;
};
