import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  badgeText,
  className,
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6', className)}>
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight font-geist">{title}</h2>
          {badgeText && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-badges bg-canvas text-ink border border-hairline">
              {badgeText}
            </span>
          )}
        </div>
        {subtitle && <p className="text-sm text-mid-gray mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
};
