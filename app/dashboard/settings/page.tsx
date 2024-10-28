import { Heading } from '@/components/Heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
  description: 'Settings',
};

export default function SettingsPage() {
  return (
    <div>
      <Heading variant='h2'>Settings</Heading>
    </div>
  );
}
