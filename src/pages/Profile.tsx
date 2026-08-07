import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useUserStore } from '../store/userStore';
import { Phone, MapPin, Heart, Stethoscope, ShieldAlert, Edit2 } from 'lucide-react';
import { GradientButton } from '../components/ui/GradientButton';

export const Profile: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-geist">
      <SectionHeader
        title="User & Medical Profile"
        subtitle="Personal healthcare summary, primary medical conditions, and emergency contacts."
        action={
          <GradientButton variant="glass" size="sm" leftIcon={<Edit2 className="w-4 h-4" />}>
            Edit Profile
          </GradientButton>
        }
      />

      <GlassCard className="p-6 flex flex-col sm:flex-row items-center gap-6">
        <Avatar src={user?.avatarUrl} name={user?.name || 'Savitri Sharma'} size="xl" status="online" />
        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-semibold text-ink">{user?.name || 'Savitri Sharma'}</h2>
            <StatusBadge status="optimal" label="Protected Person" size="sm" />
          </div>
          <p className="text-sm text-mid-gray">
            {user?.age || 74} Years Old • Female • Blood Group {user?.bloodGroup || 'O+'}
          </p>
          <p className="text-xs text-mid-gray flex items-center justify-center sm:justify-start gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> Bandra West, Mumbai, Maharashtra
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-hairline pb-3">
            <Heart className="w-4 h-4 text-ink" />
            <h3 className="text-sm font-semibold text-ink">Primary Medical Conditions</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-buttons bg-canvas border border-hairline">
              <p className="text-xs font-semibold text-ink">Essential Hypertension</p>
              <p className="text-xs text-mid-gray mt-0.5">Diagnosed 2018 • Monitored daily via Amlodipine 5mg</p>
            </div>
            <div className="p-3 rounded-buttons bg-canvas border border-hairline">
              <p className="text-xs font-semibold text-ink">Type-2 Diabetes Mellitus</p>
              <p className="text-xs text-mid-gray mt-0.5">Mild • Controlled via Metformin 500mg</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-hairline pb-3">
            <Stethoscope className="w-4 h-4 text-ink" />
            <h3 className="text-sm font-semibold text-ink">Attending Physicians</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-buttons bg-canvas border border-hairline flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-ink">Dr. Vikram Patel</p>
                <p className="text-xs text-mid-gray mt-0.5">Family Cardiologist • Holy Family Hospital</p>
              </div>
              <a href="tel:+919898012345" className="p-1.5 rounded-buttons bg-paper border border-hairline text-ink hover:bg-hairline/60">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5 space-y-3">
        <div className="flex items-center gap-2 border-b border-hairline pb-3">
          <ShieldAlert className="w-4 h-4 text-ink" />
          <h3 className="text-sm font-semibold text-ink">Health Insurance & Government IDs</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-buttons bg-canvas border border-hairline">
            <span className="text-mid-gray uppercase tracking-caption">Ayushman Bharat Health ID (ABHA)</span>
            <p className="font-mono font-semibold text-ink mt-1">91-4829-1048-2910</p>
          </div>
          <div className="p-3 rounded-buttons bg-canvas border border-hairline">
            <span className="text-mid-gray uppercase tracking-caption">Star Health Senior Citizen Policy</span>
            <p className="font-mono font-semibold text-ink mt-1">POL-84920492-01</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Profile;
