'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/Button';
import { Span } from '@/components/Span';

export const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='default'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunIcon className='!h-5 !w-5 rotate-90 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute !h-5 !w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <Span className='sr-only'>Toggle theme</Span>
    </Button>
  );
};
