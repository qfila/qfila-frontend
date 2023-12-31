import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[4px] text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      colorVariant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-gray-300/30 hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      variant: {
        outline: 'border-2 bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        colorVariant: 'primary',
        variant: 'outline',
        className:
          'border-primary text-primary hover:text-primary-foreground hover:bg-primary',
      },
      {
        colorVariant: 'secondary',
        variant: 'outline',
        className:
          'border-secondary text-secondary hover:text-secondary-foreground hover:bg-secondary',
      },
      {
        colorVariant: 'destructive',
        variant: 'outline',
        className:
          'border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive',
      },
    ],
    defaultVariants: {
      colorVariant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      colorVariant,
      size,
      asChild = false,
      loading,
      icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    function renderIcon() {
      if (loading) return <Loader2 className="h-4 w-4 animate-spin" />;
      if (icon) return icon;
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, colorVariant, size, className }),
          loading || icon ? 'flex items-center gap-2' : '',
        )}
        ref={ref}
        {...props}
      >
        {renderIcon()}
        {props.children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
