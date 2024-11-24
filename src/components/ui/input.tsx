import * as React from 'react';

import { cn } from '@/utils/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'bg-transparent flex h-8 w-full shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'px-3 py-1 text-md rounded-md border border-input',
        list: 'p-0 px-2 outline-1 rounded outline-white/50 bg-accent/75',
      },
      active: {
        default: '',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      active: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, active, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, active, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
