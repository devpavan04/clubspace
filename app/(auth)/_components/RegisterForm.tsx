'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/app/(auth)/schema';
import { OnSubmitActionResponse, RegisterFormData } from '@/app/(auth)/types';
import toast from 'react-hot-toast';
import { Text, Button, Flex, TextField, Card } from '@radix-ui/themes';
import Link from 'next/link';

interface RegisterFormProps {
  onSubmitAction: (data: RegisterFormData) => Promise<OnSubmitActionResponse>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmitAction,
}) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      const { successMessage, errorMessage } = await onSubmitAction(data);

      if (successMessage) toast.success(successMessage);
      if (errorMessage) toast.error(errorMessage);

      reset();
    });
  };

  return (
    <Card style={{ padding: '1.6rem' }} variant='surface'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <Flex direction='column' gap='5' as='div'>
          <Text size='6' weight='bold'>
            Sign up 📝
          </Text>

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

          <Button size='3' disabled={(isSubmitted && !isValid) || isPending}>
            Sign up
          </Button>

          <Text size='3' align='center'>
            Already have an account? <Link href='/login'>Sign in</Link>
          </Text>
        </Flex>
      </form>
    </Card>
  );
};
