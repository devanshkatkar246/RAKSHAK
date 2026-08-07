import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Pill, CheckCircle2, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '../../utils/cn';

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  time: string;
  type?: 'vital_alert' | 'medication' | 'system' | 'emergency';
  onDismiss?: (id: string) => void;
  className?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  title,
  message,
  time,
  type = 'system',
  onDismiss,
  className,
}) => {
  const isEmergency = type === 'emergency';

  const getIcon = () => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-ember stroke-[1.75]" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-ink stroke-[1.75]" />;
      case 'vital_alert':
        return <Bell className="w-4 h-4 text-ink stroke-[1.75]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-ink stroke-[1.75]" />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}>
      <GlassCard
        accentBorder={isEmergency ? 'danger' : 'none'}
        className={cn('p-4 flex items-start justify-between gap-3 font-geist', className)}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-buttons bg-canvas border border-hairline shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink">{title}</h4>
            <p className="text-sm text-mid-gray mt-0.5 leading-normal">{message}</p>
            <span className="text-xs text-mid-gray mt-1.5 inline-block font-mono">{time}</span>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(id)}
            className="p-1 rounded-buttons hover:bg-canvas text-mid-gray hover:text-ink transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </GlassCard>
    </motion.div>
  );
};
