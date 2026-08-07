import React from 'react';

interface MobileShellProps {
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto sm:max-w-xl md:max-w-4xl lg:max-w-7xl">
      {children}
    </div>
  );
};
