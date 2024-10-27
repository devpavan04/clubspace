import * as React from 'react';
import { cn } from '@/lib/utils';

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p className={cn('text-base', className)} ref={ref} {...props} />;
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };
