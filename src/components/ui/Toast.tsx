import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: 'info' | 'success' | 'danger';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, type = 'info', onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-buttons border shadow-subtle text-xs font-medium font-geist max-w-sm',
            type === 'danger'
              ? 'bg-paper text-ember border-ember'
              : 'bg-ink text-paper border-transparent'
          )}
        >
          {type === 'danger' ? (
            <AlertTriangle className="w-4 h-4 text-ember shrink-0 stroke-[2]" />
          ) : type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-paper shrink-0 stroke-[2]" />
          ) : (
            <Info className="w-4 h-4 text-paper shrink-0 stroke-[2]" />
          )}

          <span className="leading-tight">{message}</span>

          {onClose && (
            <button onClick={onClose} className="p-0.5 hover:opacity-75 transition-opacity ml-auto">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
