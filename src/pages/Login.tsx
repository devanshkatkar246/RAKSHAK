import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { useUserStore } from '../store/userStore';
import { ROUTES } from '../constants/routes';
import { ShieldCheck, User, Users, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>('elderly');

  const handleContinue = () => {
    login('savitri@rakshak.ai', selectedRole);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <GlassCard className="p-8 space-y-6 text-center shadow-subtle font-geist">
      {/* Onboarding Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Welcome to Rakshak
        </h2>
        <p className="text-sm text-mid-gray leading-relaxed max-w-sm mx-auto">
          Continuous AI Guardian protection for elderly independence and family peace of mind.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold uppercase tracking-caption text-mid-gray block text-left">
          Select Your Access Role
        </label>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedRole('elderly')}
            className={`p-4 rounded-buttons border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
              selectedRole === 'elderly'
                ? 'bg-ink text-paper border-transparent shadow-none'
                : 'bg-canvas text-ink border-hairline hover:bg-hairline/60'
            }`}
          >
            <User className={`w-5 h-5 ${selectedRole === 'elderly' ? 'text-paper' : 'text-ink'}`} />
            <div>
              <p className="text-xs font-semibold">Protected Elder</p>
              <p className={`text-[10px] mt-0.5 ${selectedRole === 'elderly' ? 'text-paper/80' : 'text-mid-gray'}`}>
                Simple, voice-friendly UI
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('family_member')}
            className={`p-4 rounded-buttons border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
              selectedRole === 'family_member'
                ? 'bg-ink text-paper border-transparent shadow-none'
                : 'bg-canvas text-ink border-hairline hover:bg-hairline/60'
            }`}
          >
            <Users className={`w-5 h-5 ${selectedRole === 'family_member' ? 'text-paper' : 'text-ink'}`} />
            <div>
              <p className="text-xs font-semibold">Family Guardian</p>
              <p className={`text-[10px] mt-0.5 ${selectedRole === 'family_member' ? 'text-paper/80' : 'text-mid-gray'}`}>
                Remote telemetry dashboard
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Continue Action */}
      <div className="pt-2">
        <GradientButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {selectedRole === 'elderly' ? 'Enter Elder Dashboard' : 'Enter Family Dashboard'}
        </GradientButton>
      </div>

      {/* Trust Badge */}
      <div className="pt-4 border-t border-hairline flex items-center justify-center gap-1.5 text-xs text-mid-gray">
        <ShieldCheck className="w-4 h-4 text-ink" />
        <span>End-to-End Encrypted Health Protection</span>
      </div>
    </GlassCard>
  );
};

export default Login;
