import * as React from 'react';
import { cn } from '@/lib/utils';

const Span = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return <span className={cn('text-base', className)} ref={ref} {...props} />;
});

Span.displayName = 'Span';

export { Span };
