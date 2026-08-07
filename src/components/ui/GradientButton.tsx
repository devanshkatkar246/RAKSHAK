import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Button System — Monochromatic Pill Controls
 * Specs: 18px border-radius, Geist 14px weight 500.
 * Primary: #0a0a0a fill, #ffffff text.
 * Secondary/Ghost: #f5f5f5 fill, #0a0a0a text.
 * Destructive: #e7000b.
 */
export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-ink hover:bg-ink-soft text-paper border border-transparent shadow-none',
    secondary:
      'bg-canvas hover:bg-hairline text-ink border border-transparent',
    danger:
      'bg-ember hover:bg-ember/90 text-paper border border-transparent',
    ghost:
      'bg-transparent hover:bg-canvas text-ink border border-transparent',
    glass:
      'bg-paper hover:bg-canvas text-ink border border-hairline',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-buttons gap-1.5 h-8',
    md: 'px-4 py-2 text-sm rounded-buttons gap-2 h-9 font-medium',
    lg: 'px-5 py-2.5 text-sm rounded-buttons gap-2.5 h-10 font-medium',
    xl: 'px-6 py-3 text-base rounded-buttons gap-3 h-12 font-semibold',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none font-geist',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
