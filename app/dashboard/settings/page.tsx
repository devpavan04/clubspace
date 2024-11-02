import { Heading } from '@/components/Heading';
import { Settings } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
  description: 'Settings',
};

export default function SettingsPage() {
  return (
    <div>
      <Heading variant='h2' className='flex items-center gap-2'>
        <Settings className='!w-6 !h-6' /> Settings
      </Heading>
    </div>
  );
}
