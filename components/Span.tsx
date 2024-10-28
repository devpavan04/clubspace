import * as React from 'react';
import { cn } from '@/lib/utils';
import { RESPONSIVE_TEXT_SIZES } from '@/constants/classnames';

const Span = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      className={cn(RESPONSIVE_TEXT_SIZES, className)}
      ref={ref}
      {...props}
    />
  );
});

Span.displayName = 'Span';

export { Span };
