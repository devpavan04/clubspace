import { Metadata } from 'next';
import { Heading } from '@/components/Heading';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <Heading variant='h1'>Overview</Heading>
    </div>
  );
}
