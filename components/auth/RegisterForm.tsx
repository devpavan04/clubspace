'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema/auth/schema';
import { ServerActionResponse } from '@/types/types';
import { RegisterFormData } from '@/types/auth/types';
import toast from 'react-hot-toast';
import { Text, Button, Flex, TextField, Card } from '@radix-ui/themes';
import Link from 'next/link';
import { DEFAULT_LOGGED_OUT_REDIRECT } from '@/constants/routes';
import { useRouter } from 'next/navigation';

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
    <Card style={{ padding: '1.6rem' }} variant='surface'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' gap='6' as='div'>
          <Text size='6' weight='bold'>
            Sign up 📝
          </Text>

          <Flex direction='column' gap='4' as='div'>
            <Flex direction='column' gap='2' as='div'>
              <Text size='3' weight='medium' as='label'>
                Name
              </Text>
              <TextField.Root
                size='3'
                placeholder='John Doe'
                {...register('name')}
                type='text'
              />
              {errors.name?.message && (
                <Text size='2' color='red'>
                  {errors.name.message}
                </Text>
              )}
            </Flex>

            <Flex direction='column' gap='2' as='div'>
              <Text size='3' weight='medium' as='label'>
                Email
              </Text>
              <TextField.Root
                size='3'
                placeholder='johndoe@example.com'
                {...register('email')}
                type='email'
              />
              {errors.email?.message && (
                <Text size='2' color='red'>
                  {errors.email.message}
                </Text>
              )}
            </Flex>

            <Flex direction='column' gap='2' as='div'>
              <Text size='3' weight='medium' as='label'>
                Password
              </Text>
              <TextField.Root
                size='3'
                placeholder='********'
                {...register('password')}
                type='password'
              />
              {errors.password?.message && (
                <Text size='2' color='red'>
                  {errors.password.message}
                </Text>
              )}
            </Flex>
          </Flex>

          <Flex direction='column' gap='4' as='div'>
            <Button
              size='3'
              disabled={(isSubmitted && !isValid) || isPending}
              mt='4'
            >
              Sign up
            </Button>

            <Text size='3' align='center'>
              Already have an account? <Link href='/auth/login'>Sign in</Link>
            </Text>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
