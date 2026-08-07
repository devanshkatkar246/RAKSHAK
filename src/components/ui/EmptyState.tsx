import React from 'react';
import { GlassCard } from './GlassCard';
import { GradientButton } from './GradientButton';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <GlassCard className={cn('p-8 text-center flex flex-col items-center justify-center my-6 font-geist', className)}>
      <div className="w-12 h-12 rounded-buttons bg-canvas border border-hairline flex items-center justify-center mb-3 text-mid-gray">
        {icon || <Inbox className="w-5 h-5 stroke-[1.75]" />}
      </div>
      <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
      <p className="text-sm text-mid-gray max-w-md mx-auto mb-5 leading-normal">
        {description}
      </p>
      {actionLabel && onAction && (
        <GradientButton variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </GradientButton>
      )}
    </GlassCard>
  );
};
