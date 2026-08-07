import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, Pill, AlertTriangle, Users, Settings } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className }) => {
  const navItems = [
    { path: ROUTES.DASHBOARD, label: 'Vitals', icon: LayoutDashboard },
    { path: ROUTES.CHAT, label: 'AI Guardian', icon: Bot, isSpecial: true },
    { path: ROUTES.MEDICATIONS, label: 'Meds', icon: Pill },
    { path: ROUTES.SOS, label: 'SOS', icon: AlertTriangle, isAlert: true },
    { path: ROUTES.FAMILY, label: 'Family', icon: Users },
    { path: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 bg-paper border-t border-hairline px-2 py-2 sm:hidden font-geist',
        className
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center justify-center py-1.5 px-3 rounded-buttons transition-colors duration-150 text-xs font-medium select-none',
                  isActive
                    ? item.isAlert
                      ? 'bg-ember text-paper font-semibold'
                      : 'bg-canvas text-ink font-semibold'
                    : 'text-mid-gray hover:text-ink'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'w-4 h-4 mb-0.5 stroke-[1.75]',
                      isActive && !item.isAlert && 'text-ink',
                      isActive && item.isAlert && 'text-paper'
                    )}
                  />
                  <span className="text-[11px] leading-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
