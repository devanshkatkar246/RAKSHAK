import React from 'react';
import { HealthRiskLevel } from '../../types';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: HealthRiskLevel | 'active' | 'offline' | 'pending';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  className?: string;
}

/**
 * StatusBadge Component — Capsule Tag / Status Pill
 * Specs: 18px radius, Geist 12px weight 500. Achromatic palette with Ember for errors.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showPulse = false,
  className,
}) => {
  const statusConfig = {
    optimal: {
      color: 'bg-canvas text-ink border border-hairline',
      dot: 'bg-ink',
      defaultLabel: 'Optimal',
    },
    stable: {
      color: 'bg-canvas text-ink border border-hairline',
      dot: 'bg-mid-gray',
      defaultLabel: 'Stable',
    },
    active: {
      color: 'bg-ink text-paper border border-transparent',
      dot: 'bg-paper',
      defaultLabel: 'Active Guarding',
    },
    caution: {
      color: 'bg-canvas text-ink border border-hairline',
      dot: 'bg-mid-gray',
      defaultLabel: 'Caution',
    },
    critical: {
      color: 'bg-canvas text-ember border border-ember',
      dot: 'bg-ember',
      defaultLabel: 'Critical Alert',
    },
    offline: {
      color: 'bg-canvas text-mid-gray border border-hairline',
      dot: 'bg-mid-gray',
      defaultLabel: 'Offline',
    },
    pending: {
      color: 'bg-canvas text-mid-gray border border-hairline',
      dot: 'bg-mid-gray',
      defaultLabel: 'Pending',
    },
  };

  const config = statusConfig[status] || statusConfig.stable;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium gap-1.5',
    md: 'px-2.5 py-0.5 text-xs font-medium gap-1.5',
    lg: 'px-3 py-1 text-xs font-medium gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badges transition-colors duration-150 select-none font-geist',
        config.color,
        sizeStyles[size],
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {showPulse && status === 'critical' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
        )}
        <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', config.dot)} />
      </span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
