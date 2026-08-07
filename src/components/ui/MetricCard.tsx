import React from 'react';
import { VitalMetric } from '../../types';
import { GlassCard } from './GlassCard';
import { StatusBadge } from './StatusBadge';
import { Activity, Heart, Moon, Footprints, ShieldCheck, Thermometer } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  vital: VitalMetric;
  onClick?: () => void;
  className?: string;
}

/**
 * MetricCard Component — Stat Block Container
 * Specs: White background #ffffff, 24px radius, 1px solid #e5e5e5 border,
 * shadow --shadow-subtle, 20px padding.
 * Label: 12px uppercase #737373. Value: 30-36px Geist weight 600 #0a0a0a.
 */
export const MetricCard: React.FC<MetricCardProps> = ({ vital, onClick, className }) => {
  const getIcon = () => {
    switch (vital.type) {
      case 'heart_rate':
        return <Heart className="w-4 h-4 text-ink stroke-[1.75]" />;
      case 'blood_pressure':
        return <Activity className="w-4 h-4 text-ink stroke-[1.75]" />;
      case 'spo2':
        return <ShieldCheck className="w-4 h-4 text-ink stroke-[1.75]" />;
      case 'sleep':
        return <Moon className="w-4 h-4 text-ink stroke-[1.75]" />;
      case 'steps':
        return <Footprints className="w-4 h-4 text-ink stroke-[1.75]" />;
      default:
        return <Thermometer className="w-4 h-4 text-ink stroke-[1.75]" />;
    }
  };

  const isCritical = vital.risk === 'critical';

  return (
    <GlassCard
      glowOnHover
      onClick={onClick}
      accentBorder={isCritical ? 'danger' : 'none'}
      className={cn('cursor-pointer flex flex-col justify-between group', className)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-buttons bg-canvas border border-hairline group-hover:border-mid-gray/40 transition-colors">
            {getIcon()}
          </div>
          <h3 className="text-xs font-medium uppercase tracking-caption text-mid-gray font-geist">
            {vital.label}
          </h3>
        </div>

        <StatusBadge status={vital.risk} size="sm" />
      </div>

      <div className="my-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-semibold text-ink tracking-heading font-geist">
            {vital.value}
          </span>
          <span className="text-xs font-normal text-mid-gray">{vital.unit}</span>
        </div>
      </div>

      {/* Monochrome Sparkline Chart */}
      {vital.history && vital.history.length > 0 && (
        <div className="h-10 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={vital.history}>
              <defs>
                <linearGradient id={`gradient-mono-${vital.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isCritical ? '#e7000b' : '#0a0a0a'} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={isCritical ? '#e7000b' : '#0a0a0a'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isCritical ? '#e7000b' : '#0a0a0a'}
                strokeWidth={1.5}
                fill={`url(#gradient-mono-${vital.id})`}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-mid-gray pt-2 border-t border-hairline mt-1">
        <span>{vital.trendValue}</span>
        <span>{vital.lastUpdated}</span>
      </div>
    </GlassCard>
  );
};
