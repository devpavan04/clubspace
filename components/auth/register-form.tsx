'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema/auth/schema';
import { ServerActionResponse } from '@/types/types';
import { RegisterFormData } from '@/types/auth/types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { DEFAULT_LOGGED_OUT_REDIRECT } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterFormProps {
  submitServerAction: (data: RegisterFormData) => Promise<ServerActionResponse>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  submitServerAction,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const { success, message } = await submitServerAction(data);

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
      } finally {
        reset();
      }
    });
  };

  return (
    <Card className='flex flex-col gap-1'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <Label>Name</Label>
            <Input placeholder='John Doe' {...register('name')} type='text' />
            {errors.name?.message && (
              <p className='text-red-600 dark:text-red-400'>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <Label>Email</Label>
            <Input
              placeholder='johndoe@example.com'
              {...register('email')}
              type='email'
            />
            {errors.email?.message && (
              <p className='text-red-600 dark:text-red-400'>
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
              <p className='text-red-600 dark:text-red-400'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <Button
              type='submit'
              disabled={(isSubmitted && !isValid) || isPending}
            >
              Sign up
            </Button>

            <p className='text-center'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='hover:underline text-gray-600 dark:text-gray-400'
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};