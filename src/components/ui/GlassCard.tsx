import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  accentBorder?: 'primary' | 'secondary' | 'danger' | 'none';
  variant?: 'default' | 'subtle' | 'gradient';
}

/**
 * Card Component — Clean Monochromatic Surface Container
 * Specs: Background #ffffff, radius 24px, border 1px solid #e5e5e5,
 * shadow --shadow-subtle, padding 20px.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowOnHover = false,
  accentBorder = 'none',
  variant = 'default',
  ...props
}) => {
  const borderClasses = {
    none: 'border-hairline',
    primary: 'border-ink',
    secondary: 'border-mid-gray',
    danger: 'border-ember',
  };

  const variantClasses = {
    default: 'bg-paper',
    subtle: 'bg-surface-alt',
    gradient: 'bg-paper',
  };

  return (
    <motion.div
      whileHover={glowOnHover ? { y: -1, transition: { duration: 0.15 } } : undefined}
      className={cn(
        'relative rounded-cards border p-5 transition-all duration-200 shadow-subtle',
        variantClasses[variant],
        borderClasses[accentBorder],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
