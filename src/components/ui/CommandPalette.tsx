import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, Bot, Pill, AlertTriangle, Users, Settings, FileText, Bell, User, Heart } from 'lucide-react';
import { Modal } from './Modal';
import { ROUTES } from '../../constants/routes';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const commands = [
    { label: 'Go to Vitals Dashboard', route: ROUTES.DASHBOARD, icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Open AI Guardian Assistant', route: ROUTES.CHAT, icon: Bot, category: 'Navigation' },
    { label: 'View Health Telemetry', route: ROUTES.HEALTH, icon: Heart, category: 'Navigation' },
    { label: 'Manage Medications & Schedule', route: ROUTES.MEDICATIONS, icon: Pill, category: 'Navigation' },
    { label: 'Emergency SOS Trigger', route: ROUTES.SOS, icon: AlertTriangle, category: 'Navigation' },
    { label: 'Family Guardian Circle', route: ROUTES.FAMILY, icon: Users, category: 'Navigation' },
    { label: 'Health Analytics & Reports', route: ROUTES.REPORTS, icon: FileText, category: 'Navigation' },
    { label: 'Notification Inbox', route: ROUTES.NOTIFICATIONS, icon: Bell, category: 'Navigation' },
    { label: 'User Profile & Insurance', route: ROUTES.PROFILE, icon: User, category: 'Navigation' },
    { label: 'Settings & Accessibility', route: ROUTES.SETTINGS, icon: Settings, category: 'Navigation' },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (route: string) => {
    navigate(route);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by global listener if passed handler
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl p-0 overflow-hidden">
      <div className="p-3 border-b border-hairline flex items-center gap-2">
        <Search className="w-4 h-4 text-mid-gray shrink-0 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search page..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-mid-gray focus:outline-none py-1 font-geist"
          autoFocus
        />
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-canvas border border-hairline text-mid-gray">
          ESC
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-xs text-mid-gray font-geist">No commands found</div>
        ) : (
          filtered.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.route}
                onClick={() => handleSelect(cmd.route)}
                className="w-full flex items-center justify-between p-2.5 rounded-buttons hover:bg-canvas text-left transition-colors text-xs text-ink cursor-pointer font-geist"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-mid-gray stroke-[1.75]" />
                  <span>{cmd.label}</span>
                </div>
                <span className="text-[10px] text-mid-gray uppercase tracking-caption font-mono">
                  {cmd.category}
                </span>
              </button>
            );
          })
        )}
      </div>
    </Modal>
  );
};
