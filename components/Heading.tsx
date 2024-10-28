import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl sm:text-4xl lg:text-5xl font-medium',
      h2: 'text-2xl sm:text-3xl lg:text-4xl font-medium',
      h3: 'text-xl sm:text-2xl lg:text-3xl font-medium',
      h4: 'text-lg sm:text-xl lg:text-2xl font-medium',
      h5: 'text-base sm:text-lg lg:text-xl font-medium',
      h6: 'text-sm sm:text-base lg:text-lg font-medium',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant || 'h1';
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
