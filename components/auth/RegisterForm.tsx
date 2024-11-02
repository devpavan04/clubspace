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
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterFormProps = {
  serverAction: (data: RegisterFormData) => Promise<ServerActionResponse>;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ serverAction }) => {
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const { success, message } = await serverAction(data);

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
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <Label>First Name</Label>
            <Input
              placeholder='John Doe'
              {...register('firstName')}
              type='text'
            />
            {errors.firstName?.message && (
              <p className='text-sm text-red-600 dark:text-red-400'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <Label>Last Name</Label>
            <Input
              placeholder='John Doe'
              {...register('lastName')}
              type='text'
            />
            {errors.lastName?.message && (
              <p className='text-sm text-red-600 dark:text-red-400'>
                {errors.lastName.message}
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
              Register
            </Button>

            <p className='text-center'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='hover:underline text-muted-foreground'
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
