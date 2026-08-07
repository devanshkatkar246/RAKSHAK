import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mic } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FloatingActionButtonProps {
  onClick: () => void;
  type?: 'sos' | 'voice' | 'custom';
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  type = 'sos',
  icon,
  label,
  className,
}) => {
  const isSOS = type === 'sos';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'fixed bottom-20 right-5 z-40 sm:bottom-6 sm:right-8 flex items-center justify-center gap-2 rounded-buttons px-4 py-3 shadow-subtle cursor-pointer transition-colors duration-150 select-none border font-geist text-sm font-medium',
        isSOS
          ? 'bg-ember text-paper border-transparent hover:bg-ember/90'
          : 'bg-ink text-paper border-transparent hover:bg-ink-soft',
        className
      )}
      aria-label={label || (isSOS ? 'Emergency SOS Trigger' : 'Voice Assistant')}
    >
      {icon ? (
        icon
      ) : isSOS ? (
        <AlertCircle className="w-5 h-5 stroke-[1.75]" />
      ) : (
        <Mic className="w-5 h-5 stroke-[1.75]" />
      )}
      {label && <span className="tracking-wide">{label}</span>}
    </motion.button>
  );
};
