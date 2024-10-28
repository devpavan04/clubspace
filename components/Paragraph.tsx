import * as React from 'react';
import { cn } from '@/lib/utils';
import { RESPONSIVE_TEXT_SIZES } from '@/constants/classnames';

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p className={cn(RESPONSIVE_TEXT_SIZES, className)} ref={ref} {...props} />
  );
});

Paragraph.displayName = 'Paragraph';

export { Paragraph };
