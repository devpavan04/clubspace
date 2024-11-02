import { Metadata } from 'next';
import { Heading } from '@/components/Heading';
import { LayoutGrid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <Heading variant='h2' className='flex items-center gap-2'>
        <LayoutGrid className='!w-6 !h-6' /> Overview
      </Heading>
    </div>
  );
}
