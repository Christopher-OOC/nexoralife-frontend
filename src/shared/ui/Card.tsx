import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hover?: boolean;
  rounded?: 'xl' | '2xl' | '32px';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  noPadding = false,
  hover = false,
  rounded = '32px',
  ...props 
}) => {
  const roundedClass =
    rounded === 'xl' ? 'rounded-xl' : rounded === '2xl' ? 'rounded-2xl' : 'rounded-[32px]';
  
  return (
    <motion.div
      className={cn(
        'border border-border bg-card text-card-foreground shadow-sm',
        roundedClass,
        !noPadding && 'p-6',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
