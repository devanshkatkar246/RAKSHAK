import React, { useState, useEffect } from 'react';
import { Shield, Bell, HeartPulse, Search, RefreshCw, PlayCircle } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { useHealthStore } from '../../store/healthStore';
import { StatusBadge } from './StatusBadge';
import { Avatar } from './Avatar';
import { GradientButton } from './GradientButton';
import { DemoModeModal } from './DemoModeModal';
import { cn } from '../../utils/cn';

interface NavigationBarProps {
  className?: string;
  onNotificationClick?: () => void;
  onOpenSearch?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  className,
  onNotificationClick,
  onOpenSearch,
}) => {
  const { user } = useUserStore();
  const { overview, isSyncing, syncVitals } = useHealthStore();
  const [currentTime, setCurrentTime] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

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

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 w-full bg-paper border-b border-hairline px-4 sm:px-8 py-3 flex items-center justify-between font-geist',
          className
        )}
      >
        {/* Brand & Search Bar */}
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-buttons bg-ink flex items-center justify-center text-paper">
              <Shield className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-ink">RAKSHAK</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-buttons bg-canvas border border-hairline text-mid-gray hover:text-ink hover:border-mid-gray/40 transition-colors text-xs cursor-pointer w-44 md:w-56 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search or command...</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-paper border border-hairline text-mid-gray">
              ⌘K
            </span>
          </button>
        </div>

        {/* Demo Mode Button, Health Score, Sync, Notifications & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Hackathon Demo Mode Trigger */}
          <GradientButton
            variant="primary"
            size="sm"
            leftIcon={<PlayCircle className="w-3.5 h-3.5" />}
            onClick={() => setIsDemoModalOpen(true)}
          >
            Demo Mode
          </GradientButton>

          {/* Health Score Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-buttons bg-canvas border border-hairline text-xs font-medium text-ink">
            <HeartPulse className="w-3.5 h-3.5 text-ink stroke-[1.75]" />
            <span>Score: {overview.overallScore}/100</span>
          </div>

          {/* Sync Button */}
          <GradientButton
            variant="glass"
            size="sm"
            isLoading={isSyncing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={syncVitals}
            className="hidden lg:inline-flex"
          >
            Sync
          </GradientButton>

          {/* Guardian Status Tag */}
          <StatusBadge status={overview.status} label="Guardian Active" size="sm" className="hidden xl:inline-flex" />

          {/* Current Time Display */}
          <span className="hidden sm:inline-block text-xs font-mono text-mid-gray px-2 border-l border-hairline">
            {currentTime}
          </span>

          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-buttons bg-canvas border border-hairline hover:bg-hairline/60 text-ink transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Profile Avatar */}
          <Avatar src={user?.avatarUrl} name={user?.name || 'User'} size="md" status="online" />
        </div>
      </header>

      {/* Demo Mode Studio Modal */}
      <DemoModeModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default NavigationBar;
