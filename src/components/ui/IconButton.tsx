import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  className,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-ink text-paper hover:bg-ink-soft border border-transparent',
    secondary: 'bg-canvas text-ink hover:bg-hairline border border-transparent',
    ghost: 'bg-transparent text-ink hover:bg-canvas border border-transparent',
    outline: 'bg-paper text-ink border border-hairline hover:bg-canvas',
    danger: 'bg-canvas text-ember border border-hairline hover:bg-ember/10',
  };

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs rounded-buttons p-1',
    md: 'w-9 h-9 text-sm rounded-buttons p-2',
    lg: 'w-11 h-11 text-base rounded-buttons p-2.5',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none font-geist shrink-0',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
    </motion.button>
  );
};
