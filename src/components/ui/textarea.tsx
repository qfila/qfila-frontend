import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, fullWidth, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        <textarea
          className={cn(
            'flex min-h-[80px] resize-none w-full rounded-[4px] border border-[#9a9a9a] bg-background px-4 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:[#9a9a9a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            className,
            fullWidth && 'w-full',
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <span
            className={cn(
              'text-sm ml-1 mt-1',
              error ? 'text-destructive' : 'text-primary',
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
