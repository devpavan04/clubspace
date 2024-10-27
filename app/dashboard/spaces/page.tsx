import { Heading } from '@/components/Heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Spaces',
  description: 'Spaces',
};

export default function SpacesPage() {
  return (
    <div>
      <Heading variant='h1'>Spaces</Heading>
    </div>
  );
}
