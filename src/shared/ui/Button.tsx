import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { Button as ShadcnButton } from '@/components/ui/button';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  return (
    <ShadcnButton
      variant={variant === 'primary' ? 'default' : variant}
      className={className}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </ShadcnButton>
  );
};
