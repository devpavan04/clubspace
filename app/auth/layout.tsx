import type { Metadata } from 'next';
import { archivoNarrow } from '@/config/fonts';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Clubspace | Auth',
  description: 'Clubspace authentication',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='flex flex-col gap-8 w-full max-w-[600px]'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <p className={archivoNarrow.className + ' text-5xl font-bold'}>
              clubspace.
            </p>
            <ThemeToggleButton />
          </div>
          <p>One platform, uniting campus clubs, creating community!</p>
        </div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ',
          )}
        />
        {children}
      </div>
    </div>
  );
}
