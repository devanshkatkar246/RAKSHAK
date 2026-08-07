import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { useThemeStore } from '../store/themeStore';
import { useUserStore } from '../store/userStore';
import { Eye, LogOut, Watch } from 'lucide-react';
import { GradientButton } from '../components/ui/GradientButton';

export const Settings: React.FC = () => {
  const { highContrastMode, largeFontMode, soundEnabled, toggleHighContrast, toggleLargeFont, toggleSound } =
    useThemeStore();
  const { user, logout } = useUserStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-geist">
      <SectionHeader
        title="Settings & Accessibility"
        subtitle="Configure elder typography, voice audio feedback, connected wearables, and guardian permissions."
      />

      <GlassCard className="p-6 space-y-5">
        <h3 className="text-base font-semibold text-ink border-b border-hairline pb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-ink stroke-[1.75]" /> Visual & Reading Accessibility
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Large Typography Mode</p>
              <p className="text-xs text-mid-gray mt-0.5">Enlarges headings & vitals text for elderly eyes.</p>
            </div>
            <button
              onClick={toggleLargeFont}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                largeFontMode ? 'bg-ink' : 'bg-canvas border border-hairline'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-paper transition-transform ${
                  largeFontMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">High Contrast Mode</p>
              <p className="text-xs text-mid-gray mt-0.5">Enhances element boundaries for low vision.</p>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                highContrastMode ? 'bg-ink' : 'bg-canvas border border-hairline'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-paper transition-transform ${
                  highContrastMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Voice & Speech Guidance</p>
              <p className="text-xs text-mid-gray mt-0.5">Reads vitals and medication reminders aloud.</p>
            </div>
            <button
              onClick={toggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEnabled ? 'bg-ink' : 'bg-canvas border border-hairline'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-paper transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-semibold text-ink border-b border-hairline pb-3 flex items-center gap-2">
          <Watch className="w-4 h-4 text-ink stroke-[1.75]" /> Connected Wearables & IoT Devices
        </h3>
        <div className="flex items-center justify-between p-3 rounded-buttons bg-canvas border border-hairline text-xs">
          <div>
            <p className="font-semibold text-ink">Apple Watch Series 9</p>
            <p className="text-mid-gray mt-0.5">Heart Rate, SpO2, Fall Detection • Connected</p>
          </div>
          <span className="text-xs font-mono font-medium text-ink">92% Battery</span>
        </div>
      </GlassCard>

      <GlassCard className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Sign Out of Rakshak Session</p>
          <p className="text-xs text-mid-gray mt-0.5">Active session: {user?.name}</p>
        </div>
        <GradientButton variant="ghost" size="sm" leftIcon={<LogOut className="w-4 h-4 text-ember" />} onClick={logout}>
          Sign Out
        </GradientButton>
      </GlassCard>
    </div>
  );
};

export default Settings;
