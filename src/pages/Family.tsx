import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { GradientButton } from '../components/ui/GradientButton';
import { useEmergencyStore } from '../store/emergencyStore';
import { useHealthStore } from '../store/healthStore';
import { useUserStore } from '../store/userStore';
import {
  Phone,
  MapPin,
  UserPlus,
  Sparkles,
  Download,
} from 'lucide-react';

export const Family: React.FC = () => {
  const { contacts } = useEmergencyStore();
  const { overview } = useHealthStore();
  const { user } = useUserStore();

  const activityTimeline = [
    { time: '08:30 AM', title: 'Morning Telemetry Synced', detail: 'HR 72 BPM, SpO2 98%', domain: 'Health' },
    { time: '08:00 AM', title: 'Amlodipine 5mg Taken', detail: 'Logged on schedule with water', domain: 'Medication' },
    { time: 'Yesterday 04:15 PM', title: 'Fake Electricity Scam Call Auto-Blocked', detail: 'Blocked +91 98201 02938', domain: 'Security' },
    { time: 'Yesterday 05:30 PM', title: 'Family Phone Call with Rajesh', detail: '14 minutes duration • Positive mood', domain: 'Emotional' },
  ];

  const riskAlerts = [
    { title: 'Stage-1 BP Spike (Resolved)', detail: 'BP reached 138/88 mmHg at 06:00 PM yesterday. Returned to 122/78 mmHg after rest.', severity: 'stable' as const },
    { title: 'Low Medication Stock', detail: 'Metformin 500mg supply has 7 days remaining. Refill request sent to Apollo Pharmacy.', severity: 'caution' as const },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-geist pb-12">
      <SectionHeader
        title="Caregiver & Family Ecosystem"
        subtitle="Remote health telemetry, live elder location, medication adherence, and doctor-ready summaries."
        badgeText="Elder: Savitri Sharma (74y)"
        action={
          <div className="flex items-center gap-2">
            <GradientButton variant="glass" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Doctor Summary
            </GradientButton>
            <GradientButton variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
              Add Family Guardian
            </GradientButton>
          </div>
        }
      />

      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar src={user?.avatarUrl} name={user?.name || 'Savitri Sharma'} size="xl" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-ink">{user?.name || 'Savitri Sharma'}</h3>
                <StatusBadge status="optimal" label="Protected 24/7" size="sm" />
              </div>
              <p className="text-xs text-mid-gray mt-1 flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-ink" /> Bandra West, Mumbai • Last location sync: 2m ago
              </p>
              <p className="text-xs text-mid-gray mt-0.5">Primary Device: Apple Watch Series 9 (92% Battery)</p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-hairline pt-4 md:pt-0 md:pl-6 text-left shrink-0">
            <div>
              <span className="text-xs text-mid-gray uppercase tracking-caption">Wellness Score</span>
              <p className="text-3xl font-semibold text-ink mt-0.5">{overview.overallScore}/100</p>
            </div>
            <div>
              <span className="text-xs text-mid-gray uppercase tracking-caption">Meds Adherence</span>
              <p className="text-3xl font-semibold text-ink mt-0.5">92.5%</p>
            </div>
            <div>
              <span className="text-xs text-mid-gray uppercase tracking-caption">Mood State</span>
              <p className="text-3xl font-semibold text-ink mt-0.5">Calm</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-buttons bg-ink text-paper flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-caption text-mid-gray">
                AI Guardian Family Executive Digest
              </h4>
              <span className="text-xs text-mid-gray font-mono">Compiled Today, 08:30 AM</span>
            </div>
            <p className="text-sm text-ink leading-relaxed font-medium">
              "Savitri ji had a restful 7.8 hours of sleep last night (92% quality score). Her morning blood pressure is stable at 122/78 mmHg and heart rate is 72 BPM. She took her morning Amlodipine dose on time. Yesterday, Rakshak Financial Agent automatically blocked 1 telemarketer scam call."
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-ink">Connected Guardian Circle</h3>
          <div className="space-y-3">
            {contacts.map((c) => (
              <GlassCard key={c.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={c.avatarUrl} name={c.name} size="md" status="online" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-ink">{c.name}</h4>
                      {c.isPrimary && <StatusBadge status="optimal" label="Primary Guardian" size="sm" />}
                    </div>
                    <p className="text-xs text-mid-gray mt-0.5">{c.relation} • <span className="font-mono">{c.phone}</span></p>
                  </div>
                </div>

                <a
                  href={`tel:${c.phone}`}
                  className="p-2 rounded-buttons bg-canvas border border-hairline text-ink hover:bg-hairline/60 transition-colors"
                  aria-label={`Call ${c.name}`}
                >
                  <Phone className="w-4 h-4 stroke-[1.75]" />
                </a>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-ink">Guardian Risk Notifications</h3>
          <div className="space-y-3">
            {riskAlerts.map((alert, idx) => (
              <GlassCard key={idx} className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ink">{alert.title}</h4>
                  <StatusBadge status={alert.severity} size="sm" />
                </div>
                <p className="text-xs text-mid-gray leading-normal">{alert.detail}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h3 className="text-base font-semibold text-ink">Recent Elder Activity Timeline</h3>
          <span className="text-xs text-mid-gray font-mono">Last 24 Hours</span>
        </div>

        <div className="space-y-3">
          {activityTimeline.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-buttons bg-canvas border border-hairline text-xs font-geist">
              <div className="flex items-center gap-3">
                <span className="font-mono font-medium text-mid-gray w-28">{item.time}</span>
                <span className="font-semibold text-ink">{item.title}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper border border-hairline text-mid-gray">
                {item.domain}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Family;
