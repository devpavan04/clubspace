import type { Metadata } from 'next';
import { archivoNarrow } from '@/config/fonts';
import { ModeToggle } from '@/components/ModeToggle';
import SparklesText from '@/components/ui/sparkles-text';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Login or sign up to access your account',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex flex-col gap-8 w-[600px]'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <SparklesText
              text='Clubspace'
              sparklesCount={2}
              className={archivoNarrow.className + ' text-6xl font-bold'}
            />
            <ModeToggle />
          </div>
          <p>One platform, uniting campus clubs, creating community!</p>
        </div>
        {children}
      </div>
    </div>
  );
}
