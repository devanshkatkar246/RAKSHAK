import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Table } from '../components/ui/Table';
import { useHealthStore } from '../store/healthStore';
import { Heart, Activity, ShieldCheck, Moon, Footprints, Thermometer, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const Health: React.FC = () => {
  const { overview } = useHealthStore();

  const weeklyTrendData = [
    { day: 'Mon', heartRate: 70, bloodPressure: 120, spo2: 98, sleep: 7.2 },
    { day: 'Tue', heartRate: 74, bloodPressure: 124, spo2: 97, sleep: 6.8 },
    { day: 'Wed', heartRate: 72, bloodPressure: 122, spo2: 98, sleep: 7.5 },
    { day: 'Thu', heartRate: 68, bloodPressure: 119, spo2: 99, sleep: 8.0 },
    { day: 'Fri', heartRate: 72, bloodPressure: 121, spo2: 98, sleep: 7.8 },
    { day: 'Sat', heartRate: 71, bloodPressure: 123, spo2: 98, sleep: 7.4 },
    { day: 'Sun', heartRate: 73, bloodPressure: 122, spo2: 98, sleep: 7.9 },
  ];

  const telemetryTableHeaders = ['Vital Indicator', 'Current Reading', 'Normal Range', 'Risk Level', 'Last Sensor Reading'];
  const telemetryTableRows = [
    [
      <div className="flex items-center gap-2 font-medium"><Heart className="w-3.5 h-3.5 text-ink" /> Heart Rate</div>,
      <span className="font-semibold">{overview.heartRate.value} BPM</span>,
      <span className="text-mid-gray">60 – 100 BPM</span>,
      <StatusBadge status="optimal" size="sm" />,
      <span className="text-mid-gray font-mono">5m ago</span>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><Activity className="w-3.5 h-3.5 text-ink" /> Blood Pressure</div>,
      <span className="font-semibold">{overview.bloodPressure.value} mmHg</span>,
      <span className="text-mid-gray">90/60 – 120/80 mmHg</span>,
      <StatusBadge status="optimal" size="sm" />,
      <span className="text-mid-gray font-mono">15m ago</span>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><ShieldCheck className="w-3.5 h-3.5 text-ink" /> Oxygen Saturation (SpO2)</div>,
      <span className="font-semibold">{overview.spo2.value}%</span>,
      <span className="text-mid-gray">95 – 100%</span>,
      <StatusBadge status="optimal" size="sm" />,
      <span className="text-mid-gray font-mono">2m ago</span>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><Moon className="w-3.5 h-3.5 text-ink" /> Sleep Duration</div>,
      <span className="font-semibold">{overview.sleep.value} hrs</span>,
      <span className="text-mid-gray">7.0 – 9.0 hrs</span>,
      <StatusBadge status="optimal" size="sm" />,
      <span className="text-mid-gray font-mono">Today</span>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><Footprints className="w-3.5 h-3.5 text-ink" /> Daily Activity</div>,
      <span className="font-semibold">{overview.steps.value} steps</span>,
      <span className="text-mid-gray">3,000 – 5,000 steps</span>,
      <StatusBadge status="optimal" size="sm" />,
      <span className="text-mid-gray font-mono">1m ago</span>,
    ],
  ];

  return (
    <div className="space-y-6 font-geist">
      <SectionHeader
        title="Apple Health Telemetry"
        subtitle="Continuous non-invasive health vitals stream, risk classification, and weekly trend analysis."
        badgeText="7-Day Baseline"
      />

      <GlassCard className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-caption text-mid-gray">Composite Health Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-semibold tracking-display text-ink">{overview.overallScore}</span>
            <span className="text-sm text-mid-gray">/ 100</span>
            <StatusBadge status="optimal" label="Optimal Baseline" className="ml-2" />
          </div>
          <p className="text-sm text-mid-gray mt-2 leading-relaxed max-w-xl">
            {overview.statusMessage} Continuous monitoring by Rakshak AI indicates zero irregular rhythms or acute hypoxia risk.
          </p>
        </div>

        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-hairline pt-4 md:pt-0 md:pl-6">
          <div className="text-left">
            <p className="text-xs text-mid-gray uppercase tracking-caption">Last Assessment</p>
            <p className="text-sm font-semibold text-ink mt-0.5">{overview.lastAssessmentTime}</p>
            <p className="text-xs text-mid-gray mt-1">Primary Device: Apple Watch Series 9</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard vital={overview.heartRate} />
        <MetricCard vital={overview.bloodPressure} />
        <MetricCard vital={overview.spo2} />
        <MetricCard vital={overview.sleep} />
        <MetricCard vital={overview.steps} />
        <GlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-buttons bg-canvas border border-hairline">
                <Thermometer className="w-4 h-4 text-ink stroke-[1.75]" />
              </div>
              <h3 className="text-xs font-medium uppercase tracking-caption text-mid-gray font-geist">
                Body Temp
              </h3>
            </div>
            <StatusBadge status="optimal" size="sm" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold text-ink tracking-heading font-geist">36.6</span>
              <span className="text-xs text-mid-gray">°C</span>
            </div>
          </div>
          <div className="text-xs text-mid-gray pt-2 border-t border-hairline mt-1">Normal Range</div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-ink">7-Day Heart Rate Trend</h3>
            <p className="text-xs text-mid-gray mt-0.5">Rolling average resting heart rate (65 - 74 BPM)</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-mid-gray font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>Aug 1 - Aug 7</span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyTrendData}>
              <defs>
                <linearGradient id="mono-health-chart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} />
              <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} domain={[60, 90]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5', borderRadius: '10px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="heartRate" stroke="#0a0a0a" strokeWidth={2} fill="url(#mono-health-chart)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div>
        <h3 className="text-base font-semibold text-ink mb-3">Live Telemetry Readings</h3>
        <Table headers={telemetryTableHeaders} rows={telemetryTableRows} />
      </div>
    </div>
  );
};

export default Health;
