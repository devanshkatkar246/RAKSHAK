import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-center items-center px-4 py-8 relative font-geist">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <div className="w-10 h-10 rounded-buttons bg-ink flex items-center justify-center text-paper">
          <Shield className="w-5 h-5 stroke-[2]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            RAKSHAK
          </h1>
          <p className="text-xs font-medium tracking-caption uppercase text-mid-gray">
            The AI Digital Guardian for Elders
          </p>
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        <Outlet />
      </div>
    </div>
  );
};
