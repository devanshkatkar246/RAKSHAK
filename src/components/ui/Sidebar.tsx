import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  HeartPulse,
  Pill,
  AlertTriangle,
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  LucideIcon,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useUserStore } from '../../store/userStore';
import { Avatar } from './Avatar';
import { cn } from '../../utils/cn';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  isSpecial?: boolean;
  isAlert?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const navSections: NavSection[] = [
    {
      title: 'Core Guardian',
      items: [
        { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
        { path: ROUTES.CHAT, label: 'AI Guardian', icon: Bot, isSpecial: true },
        { path: ROUTES.HEALTH, label: 'Health Vitals', icon: HeartPulse },
        { path: ROUTES.MEDICATIONS, label: 'Medications', icon: Pill },
        { path: ROUTES.SOS, label: 'Emergency SOS', icon: AlertTriangle, isAlert: true },
      ],
    },
    {
      title: 'Management',
      items: [
        { path: ROUTES.FAMILY, label: 'Family Circle', icon: Users },
        { path: ROUTES.REPORTS, label: 'Health Reports', icon: FileText },
        { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
        { path: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col justify-between sticky top-0 h-screen bg-surface-sidebar border-r border-hairline transition-all duration-200 z-20 font-geist shrink-0',
        isCollapsed ? 'w-16 px-2 py-4' : 'w-60 px-4 py-4',
        className
      )}
    >
      {/* Brand Header & Toggle */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-buttons bg-ink flex items-center justify-center text-paper">
                <Shield className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-tight text-ink">RAKSHAK</h1>
                <p className="text-[10px] font-medium tracking-caption uppercase text-mid-gray">
                  AI Guardian
                </p>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 rounded-buttons bg-ink flex items-center justify-center text-paper mx-auto mb-2">
              <Shield className="w-4 h-4 stroke-[2]" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-buttons hover:bg-canvas text-mid-gray hover:text-ink transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-5">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {!isCollapsed && (
                <p className="text-[10px] font-semibold tracking-caption uppercase text-mid-gray px-2 mb-1.5">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2.5 px-2.5 py-2 rounded-buttons text-xs font-medium transition-colors select-none',
                          isActive
                            ? item.isAlert
                              ? 'bg-ember text-paper font-semibold'
                              : 'bg-paper text-ink shadow-subtle border border-hairline font-semibold'
                            : 'text-mid-gray hover:text-ink hover:bg-canvas'
                        )
                      }
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0 stroke-[1.75]" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="border-t border-hairline pt-3 space-y-1">
        <NavLink
          to={ROUTES.PROFILE}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 px-2 py-1.5 rounded-buttons text-xs font-medium transition-colors',
              isActive ? 'bg-paper border border-hairline text-ink' : 'hover:bg-canvas text-mid-gray hover:text-ink'
            )
          }
        >
          <Avatar src={user?.avatarUrl} name={user?.name || 'User'} size="sm" />
          {!isCollapsed && (
            <div className="truncate text-left leading-tight">
              <p className="text-xs font-medium text-ink truncate">{user?.name || 'Savitri Sharma'}</p>
              <p className="text-[10px] text-mid-gray">Elderly Profile</p>
            </div>
          )}
        </NavLink>

        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-buttons text-xs font-medium text-mid-gray hover:text-ember hover:bg-canvas transition-colors cursor-pointer',
            isCollapsed && 'justify-center'
          )}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0 stroke-[1.75]" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
