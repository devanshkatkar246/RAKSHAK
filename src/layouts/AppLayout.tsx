import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationBar } from '../components/ui/NavigationBar';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { Sidebar } from '../components/ui/Sidebar';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { CommandPalette } from '../components/ui/CommandPalette';
import { useEmergencyStore } from '../store/emergencyStore';
import { ROUTES } from '../constants/routes';

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerSOS } = useEmergencyStore();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSOSTrigger = () => {
    triggerSOS();
    navigate(ROUTES.SOS);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-row font-sans">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content & Top Header Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationBar
          onNotificationClick={() => navigate(ROUTES.NOTIFICATIONS)}
          onOpenSearch={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 pb-24 sm:pb-12 px-4 sm:px-8 max-w-7xl w-full mx-auto pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button for Emergency SOS */}
      <FloatingActionButton onClick={handleSOSTrigger} type="sos" label="SOS" />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};
