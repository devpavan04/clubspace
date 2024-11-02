'use client';

import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { ServerActionResponse } from '@/types/types';
import { DEFAULT_LOGGED_OUT_REDIRECT } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

type LogoutDropdownMenuItemProps = {
  serverAction: () => Promise<ServerActionResponse>;
};

export const LogoutDropdownMenuItem: React.FC<LogoutDropdownMenuItemProps> = ({
  serverAction,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { success, message } = await serverAction();

      if (success) {
        toast.success(message);
        router.push(DEFAULT_LOGGED_OUT_REDIRECT);
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Button variant='default' size='lg' onClick={handleLogout}>
      <LogOut className='!w-4 !h-4' />
      <span>Logout</span>
    </Button>
  );
};
