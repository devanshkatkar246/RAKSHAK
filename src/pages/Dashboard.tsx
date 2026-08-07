import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { AnimatedProgressRing } from '../components/ui/AnimatedProgressRing';
import { FloatingRakshakOrb } from '../components/ui/FloatingRakshakOrb';
import { useHealthStore } from '../store/healthStore';
import { useUserStore } from '../store/userStore';
import { ROUTES } from '../constants/routes';
import {
  ShieldCheck,
  Heart,
  Lock,
  MessageCircle,
  Sun,
  Clock,
  Sparkles,
  Bot,
  Pill,
  AlertTriangle,
  Users,
  FileText,
  Stethoscope,
  Droplet,
  ArrowUpRight,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { overview } = useHealthStore();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const guardianDomains = [
    {
      id: 'health',
      name: 'Health Guardian',
      status: 'Optimal',
      risk: 'Low Risk',
      icon: Heart,
      observation: 'Heart rate steady (72 BPM), BP normal (122/78 mmHg).',
      recommendation: 'Next dose Metformin 500mg due at 01:30 PM.',
      badgeStatus: 'optimal' as const,
    },
    {
      id: 'safety',
      name: 'Safety Guardian',
      status: 'Protected',
      risk: 'Zero Threat',
      icon: ShieldCheck,
      observation: 'Smart lock secured, fall detection sensors online.',
      recommendation: 'Living room walkway clear of obstacles.',
      badgeStatus: 'optimal' as const,
    },
    {
      id: 'financial',
      name: 'Financial Guardian',
      status: 'Secured',
      risk: 'Shielded',
      icon: Lock,
      observation: '1 suspected spam telemarketer call auto-blocked yesterday.',
      recommendation: 'Bank account & OTP protection active.',
      badgeStatus: 'optimal' as const,
    },
    {
      id: 'emotional',
      name: 'Emotional Guardian',
      status: 'Warm & Calm',
      risk: 'Healthy Mood',
      icon: MessageCircle,
      observation: 'Spoke with Rajesh (Son) yesterday afternoon.',
      recommendation: 'Suggest afternoon garden walk or calling daughter Priya.',
      badgeStatus: 'optimal' as const,
    },
  ];

  const guardianTimeline = [
    { time: '07:00 AM', domain: 'Health', title: 'Sleep Completed', detail: '7.8 hours, 92% sleep quality', status: 'optimal' as const },
    { time: '08:00 AM', domain: 'Health', title: 'Amlodipine 5mg Taken', detail: 'Morning BP medication logged', status: 'optimal' as const },
    { time: '08:30 AM', domain: 'Wellness', title: 'Hydration Goal', detail: '2 glasses of water consumed', status: 'optimal' as const },
    { time: '10:15 AM', domain: 'Financial', title: 'Spam Call Auto-Blocked', detail: 'Blocked +91 98201 02938 (Scam Suspect)', status: 'optimal' as const },
    { time: '11:30 AM', domain: 'Wellness', title: 'Morning Walk Completed', detail: '1,850 steps around society park', status: 'optimal' as const },
    { time: '01:30 PM', domain: 'Health', title: 'Metformin 500mg Upcoming', detail: 'Afternoon diabetes dose due', status: 'pending' as const },
    { time: '05:00 PM', domain: 'Emotional', title: 'Family Call Scheduled', detail: 'Suggested call with Priya', status: 'pending' as const },
    { time: '09:00 PM', domain: 'Safety', title: 'Evening Lock & Security Check', detail: 'Automatic night guard protocol', status: 'pending' as const },
  ];

  const quickActions = [
    { label: 'Voice Chat', icon: Bot, route: ROUTES.CHAT, variant: 'primary' as const },
    { label: 'Medicines', icon: Pill, route: ROUTES.MEDICATIONS, variant: 'secondary' as const },
    { label: 'Emergency SOS', icon: AlertTriangle, route: ROUTES.SOS, variant: 'danger' as const },
    { label: 'Family Circle', icon: Users, route: ROUTES.FAMILY, variant: 'glass' as const },
    { label: 'Health Reports', icon: FileText, route: ROUTES.REPORTS, variant: 'glass' as const },
    { label: 'Call Doctor', icon: Stethoscope, route: ROUTES.PROFILE, variant: 'glass' as const },
  ];

  const aiInsights = [
    {
      title: 'Sleep Quality Trend',
      description: 'Your sleep quality improved 8% compared to last week.',
      category: 'Health',
    },
    {
      title: 'Financial Protection Shield',
      description: 'Zero financial scam attempts or suspicious logins detected today.',
      category: 'Security',
    },
    {
      title: 'Family Connection Nudge',
      description: 'You haven\'t spoken with your daughter Priya for 3 days. Would you like to call her?',
      category: 'Emotional',
    },
  ];

  return (
    <div className="space-y-6 font-geist pb-12">
      {/* 1. Hero Section */}
      <SectionHeader
        title={`Namaste, ${user?.name || 'Savitri ji'}`}
        subtitle="Rakshak AI Guardian Command Center — 24/7 Protection active across Health, Safety, Financial, and Emotional domains."
        badgeText="24/7 Protection Active"
        action={
          <div className="flex items-center gap-3 text-xs font-mono text-mid-gray">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-buttons bg-canvas border border-hairline text-ink">
              <Sun className="w-3.5 h-3.5" /> Mumbai • 28°C
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-buttons bg-canvas border border-hairline text-ink">
              <Clock className="w-3.5 h-3.5" /> {currentTime}
            </span>
          </div>
        }
      />

      {/* 2. AI Daily Brief Card */}
      <GlassCard className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-buttons bg-ink text-paper flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-caption text-mid-gray">
                AI Guardian Daily Brief
              </h3>
              <span className="text-xs text-mid-gray font-mono">Today, 08:30 AM</span>
            </div>
            <p className="text-base text-ink leading-relaxed font-medium">
              "Good morning Savitri ji. You slept well (7.8 hours), today's blood pressure is normal (122/78), your morning medicine was taken on time, and one suspicious spam call was automatically blocked yesterday."
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 3. Guardian Score Ring & 4 Domain Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <GlassCard className="p-6 flex flex-col items-center justify-center text-center space-y-3 lg:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-caption text-mid-gray">
            Composite Guardian Score
          </span>

          <AnimatedProgressRing
            progress={overview.overallScore}
            size={140}
            strokeWidth={10}
            color="primary"
            centerLabel={`${overview.overallScore}`}
            subLabel="/ 100"
          />

          <div className="pt-2">
            <StatusBadge status="optimal" label="All 4 Domains Protected" size="md" />
            <p className="text-xs text-mid-gray mt-2 leading-normal max-w-xs mx-auto">
              Weighted average across Health (96%), Safety (100%), Financial (100%), and Emotional (90%).
            </p>
          </div>
        </GlassCard>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guardianDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <GlassCard key={domain.id} glowOnHover className="p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-buttons bg-canvas border border-hairline text-ink">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">{domain.name}</h4>
                      <p className="text-[11px] text-mid-gray font-mono">{domain.risk}</p>
                    </div>
                  </div>
                  <StatusBadge status={domain.badgeStatus} label={domain.status} size="sm" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-mid-gray">
                    <strong className="text-ink font-medium">Observation:</strong> {domain.observation}
                  </p>
                  <p className="text-mid-gray">
                    <strong className="text-ink font-medium">AI Advice:</strong> {domain.recommendation}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div>
        <h3 className="text-base font-semibold text-ink mb-3">Quick Guardian Controls</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <GradientButton
                key={idx}
                variant={action.variant}
                size="md"
                fullWidth
                leftIcon={<Icon className="w-4 h-4" />}
                onClick={() => navigate(action.route)}
                className="justify-start px-3 text-xs"
              >
                {action.label}
              </GradientButton>
            );
          })}
        </div>
      </div>

      {/* 5. Live Telemetry Vitals Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-ink">Live Telemetry Streams</h3>
          <button
            onClick={() => navigate(ROUTES.HEALTH)}
            className="text-xs font-medium text-mid-gray hover:text-ink transition-colors flex items-center gap-1"
          >
            View Full Vitals <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard vital={overview.heartRate} onClick={() => navigate(ROUTES.HEALTH)} />
          <MetricCard vital={overview.bloodPressure} onClick={() => navigate(ROUTES.HEALTH)} />
          <MetricCard vital={overview.spo2} onClick={() => navigate(ROUTES.HEALTH)} />
          <MetricCard vital={overview.sleep} onClick={() => navigate(ROUTES.HEALTH)} />
          <MetricCard vital={overview.steps} onClick={() => navigate(ROUTES.HEALTH)} />

          <GlassCard className="p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-buttons bg-canvas border border-hairline">
                  <Droplet className="w-4 h-4 text-ink stroke-[1.75]" />
                </div>
                <h3 className="text-xs font-medium uppercase tracking-caption text-mid-gray">
                  Hydration
                </h3>
              </div>
              <StatusBadge status="optimal" label="On Track" size="sm" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold text-ink tracking-heading font-geist">1.8</span>
                <span className="text-xs text-mid-gray">/ 2.5 Liters</span>
              </div>
            </div>
            <div className="text-xs text-mid-gray pt-2 border-t border-hairline mt-1">
              Last intake: 45m ago
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 6. AI Insight Cards & Vertical Guardian Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-3 lg:col-span-1">
          <h3 className="text-base font-semibold text-ink">Proactive Guardian Insights</h3>
          {aiInsights.map((insight, idx) => (
            <GlassCard key={idx} className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-caption text-mid-gray font-mono">
                  {insight.category}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-ink" />
              </div>
              <h4 className="text-sm font-semibold text-ink">{insight.title}</h4>
              <p className="text-xs text-mid-gray leading-normal">{insight.description}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div>
              <h3 className="text-base font-semibold text-ink">24-Hour Guardian Timeline</h3>
              <p className="text-xs text-mid-gray mt-0.5">Chronological events across all 4 protection domains</p>
            </div>
            <span className="text-xs text-mid-gray font-mono">Today</span>
          </div>

          <div className="relative pl-6 border-l border-hairline space-y-4">
            {guardianTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-paper ${
                    item.status === 'optimal' ? 'bg-ink' : 'bg-mid-gray'
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-buttons bg-canvas border border-hairline text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-mid-gray">{item.time}</span>
                      <span className="font-semibold text-ink">{item.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-paper border border-hairline text-mid-gray">
                        {item.domain}
                      </span>
                    </div>
                    <p className="text-mid-gray mt-0.5">{item.detail}</p>
                  </div>
                  <StatusBadge
                    status={item.status}
                    label={item.status === 'optimal' ? 'Completed' : 'Upcoming'}
                    size="sm"
                    className="self-start sm:self-center shrink-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <FloatingRakshakOrb />
    </div>
  );
};

export default Dashboard;
