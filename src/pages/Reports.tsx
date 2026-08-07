import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Table } from '../components/ui/Table';
import { Download, FileText, Heart, Pill, Moon, Activity, Lock, Smile } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const Reports: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const adherenceWeeklyData = [
    { label: 'Week 1', adherence: 94, heartRate: 71, sleep: 7.4 },
    { label: 'Week 2', adherence: 88, heartRate: 74, sleep: 6.9 },
    { label: 'Week 3', adherence: 96, heartRate: 70, sleep: 7.8 },
    { label: 'Week 4', adherence: 92, heartRate: 72, sleep: 7.6 },
  ];

  const reportHistoryHeaders = ['Report Title', 'Date Generated', 'Period Covered', 'Status', 'Action'];
  const reportHistoryRows = [
    [
      <div className="flex items-center gap-2 font-medium"><FileText className="w-3.5 h-3.5 text-ink" /> Monthly Geriatric Health & Vitals Digest</div>,
      <span className="text-mid-gray font-mono">Aug 1, 2026</span>,
      <span>Jul 1 – Jul 31, 2026</span>,
      <StatusBadge status="optimal" label="Generated" size="sm" />,
      <button className="text-ink font-semibold hover:underline flex items-center gap-1"><Download className="w-3.5 h-3.5" /> PDF</button>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><FileText className="w-3.5 h-3.5 text-ink" /> Physician Cardiologist Export</div>,
      <span className="text-mid-gray font-mono">Jul 15, 2026</span>,
      <span>Jun 15 – Jul 15, 2026</span>,
      <StatusBadge status="optimal" label="Generated" size="sm" />,
      <button className="text-ink font-semibold hover:underline flex items-center gap-1"><Download className="w-3.5 h-3.5" /> PDF</button>,
    ],
    [
      <div className="flex items-center gap-2 font-medium"><FileText className="w-3.5 h-3.5 text-ink" /> Financial Anti-Scam Security Audit</div>,
      <span className="text-mid-gray font-mono">Jul 1, 2026</span>,
      <span>Jun 1 – Jun 30, 2026</span>,
      <StatusBadge status="optimal" label="Generated" size="sm" />,
      <button className="text-ink font-semibold hover:underline flex items-center gap-1"><Download className="w-3.5 h-3.5" /> PDF</button>,
    ],
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-geist pb-12">
      <SectionHeader
        title="Clinical Analytics & Report Cards"
        subtitle="Comprehensive medical summaries, medication adherence analytics, and doctor-ready PDF reports."
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-buttons bg-canvas border border-hairline">
              <button
                onClick={() => setTimeframe('daily')}
                className={`px-2.5 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                  timeframe === 'daily' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-2.5 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                  timeframe === 'weekly' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-2.5 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                  timeframe === 'monthly' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
                }`}
              >
                Monthly
              </button>
            </div>

            <GradientButton variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export Full Doctor PDF
            </GradientButton>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Heart className="w-3.5 h-3.5 text-ink" /> Heart Rate
          </div>
          <p className="text-xl font-semibold text-ink">72 BPM</p>
          <p className="text-[10px] text-mid-gray">Normal Rhythm</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Pill className="w-3.5 h-3.5 text-ink" /> Adherence
          </div>
          <p className="text-xl font-semibold text-ink">92.5%</p>
          <p className="text-[10px] text-mid-gray">+3.2% vs last mo</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Moon className="w-3.5 h-3.5 text-ink" /> Sleep Quality
          </div>
          <p className="text-xl font-semibold text-ink">7.6 hrs</p>
          <p className="text-[10px] text-mid-gray">92% Rested</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Activity className="w-3.5 h-3.5 text-ink" /> Activity
          </div>
          <p className="text-xl font-semibold text-ink">3,420 steps</p>
          <p className="text-[10px] text-mid-gray">Daily Avg</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Smile className="w-3.5 h-3.5 text-ink" /> Mood Score
          </div>
          <p className="text-xl font-semibold text-ink">90 / 100</p>
          <p className="text-[10px] text-mid-gray">Calm & Warm</p>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-mid-gray text-[10px] uppercase font-semibold">
            <Lock className="w-3.5 h-3.5 text-ink" /> Scams Blocked
          </div>
          <p className="text-xl font-semibold text-ink">14 Scams</p>
          <p className="text-[10px] text-mid-gray">Zero Exposure</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-base font-semibold text-ink mb-1">Medication Adherence Rate (%)</h3>
          <p className="text-xs text-mid-gray mb-4">Percentage of prescribed doses taken on time</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adherenceWeeklyData}>
                <XAxis dataKey="label" stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5', borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="adherence" fill="#0a0a0a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-base font-semibold text-ink mb-1">Heart Rate Baseline Trend</h3>
          <p className="text-xs text-mid-gray mb-4">Weekly average resting heart rate (BPM)</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adherenceWeeklyData}>
                <defs>
                  <linearGradient id="reports-hr-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={{ stroke: '#e5e5e5' }} domain={[60, 90]} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e5e5', borderRadius: '10px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="heartRate" stroke="#0a0a0a" strokeWidth={2} fill="url(#reports-hr-chart)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-base font-semibold text-ink mb-3">Downloadable Doctor-Ready Report Cards</h3>
        <Table headers={reportHistoryHeaders} rows={reportHistoryRows} />
      </div>
    </div>
  );
};

export default Reports;
