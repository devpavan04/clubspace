'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/auth/schema';
import { ServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEFAULT_LOGGED_IN_REDIRECT } from '@/constants/routes';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginFormProps = {
  serverAction: (data: LoginFormData) => Promise<ServerActionResponse>;
};

export const LoginForm: React.FC<LoginFormProps> = ({ serverAction }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      try {
        const { success, message } = await serverAction(data);

        if (success) {
          toast.success(message);
          router.push(DEFAULT_LOGGED_IN_REDIRECT);
        } else {
          toast.error(message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } finally {
        reset();
      }
    });
  };

  return (
    <Card className='flex flex-col gap-1'>
      <CardHeader>
        <CardTitle className='text-sm sm:text-base lg:text-lg'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <Label>Email</Label>
            <Input
              placeholder='johndoe@example.com'
              {...register('email')}
              type='email'
            />
            {errors.email?.message && (
              <p className='text-sm text-red-600 dark:text-red-400'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <Label>Password</Label>
            <Input
              placeholder='********'
              {...register('password')}
              type='password'
            />
            {errors.password?.message && (
              <p className='text-sm text-red-600 dark:text-red-400'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <Button
              type='submit'
              disabled={(isSubmitted && !isValid) || isPending}
              isLoading={isPending}
              size='lg'
            >
              Login
            </Button>

            <p className='text-center'>
              Don&apos;t have an account?{' '}
              <Link
                href='/auth/register'
                className='hover:underline text-muted-foreground'
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
