import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

export const Input: React.FC<InputProps> = ({ label, icon: Icon, id, className = '', ...props }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="ml-1 text-sm font-medium text-foreground">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
        <Icon size={16} />
      </div>
      <input
        id={id}
        className={cn('h-10 w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50', className)}
        {...props}
      />
    </div>
  </div>
);
