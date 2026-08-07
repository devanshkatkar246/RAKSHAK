import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

interface FloatingRakshakOrbProps {
  className?: string;
}

export const FloatingRakshakOrb: React.FC<FloatingRakshakOrbProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={cn('fixed bottom-20 right-6 z-40 sm:bottom-8 sm:right-8', className)}>
      <motion.button
        onClick={() => navigate(ROUTES.CHAT)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-buttons bg-ink text-paper border border-hairline shadow-subtle cursor-pointer select-none font-geist"
        aria-label="Open AI Guardian Assistant"
      >
        <span className="absolute -inset-1 rounded-buttons bg-ink/10 animate-pulse pointer-events-none" />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-7 h-7 rounded-full bg-paper text-ink flex items-center justify-center border border-hairline shrink-0"
        >
          <Sparkles className="w-4 h-4 text-ink stroke-[2]" />
        </motion.div>

        <div className="text-left font-geist">
          <p className="text-xs font-semibold leading-tight text-paper flex items-center gap-1">
            Rakshak AI <span className="w-1.5 h-1.5 rounded-full bg-paper animate-ping inline-block" />
          </p>
          <p className="text-[10px] text-mid-gray leading-tight">Guardian Active</p>
        </div>
      </motion.button>
    </div>
  );
};
