import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AIThinkingAnimationProps {
  label?: string;
  reasoningSteps?: string[];
  className?: string;
}

export const AIThinkingAnimation: React.FC<AIThinkingAnimationProps> = ({
  label = 'Rakshak AI Guardian is reasoning...',
  reasoningSteps = [],
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2.5 p-4 rounded-buttons bg-canvas border border-hairline font-geist', className)}>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-paper shrink-0">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>

        <span className="text-xs font-medium text-ink">
          {label}
        </span>
      </div>

      {/* Dynamic Agentic Reasoning Step Pipeline */}
      {reasoningSteps.length > 0 && (
        <div className="space-y-1 pl-8">
          {reasoningSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-xs text-mid-gray font-mono"
            >
              <span className="w-1 h-1 rounded-full bg-mid-gray" />
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
