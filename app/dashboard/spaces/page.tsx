import { Heading } from '@/components/Heading';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getSpacesByUserId } from '@/services/space';
import { Globe, Plus, Space } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard | Spaces',
  description: 'Spaces',
};

export default async function SpacesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const { data } = await getSpacesByUserId(session.user.id);
  console.log(data);

  return (
    <div>
      <Heading variant='h2' className='flex items-center gap-2'>
        <Globe className='!w-6 !h-6' /> Spaces
      </Heading>

      {data?.length === 0 && (
        <Card className='border-dashed mt-6'>
          <CardContent className='flex flex-col items-center justify-center space-y-4 py-12 text-center'>
            <div className='rounded-full bg-primary/15 p-3'>
              <Space className='!w-5 !h-5 text-primary' />
            </div>
            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl font-semibold tracking-tight'>
                No Spaces Found
              </h2>
              <p className='text-sm text-muted-foreground max-w-md mx-auto'>
                It seems that you haven&apos;t created any spaces yet. Start by
                creating your first space to begin your journey.
              </p>
            </div>
            <Button size='lg'>
              <Plus className='!w-4 !h-4' />
              Create Space
            </Button>
          </CardContent>
        </Card>
      )}

      {data?.map((space) => <div key={space.id}>{space.name}</div>)}
    </div>
  );
}
