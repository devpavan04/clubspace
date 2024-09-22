'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, loginSchema } from '@/app/(auth)/schema';
import {
  OnSubmitActionResponse,
  RegisterFormData,
  LoginFormData,
} from '@/app/(auth)/types';
import toast from 'react-hot-toast';
import { Text, Button, Flex, TextField, Card } from '@radix-ui/themes';
import Link from 'next/link';

// Register Form Component
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
    const validation = registerSchema.safeParse(data);

    if (!validation.success) {
      reset();
      return;
    }

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
          {/* Form Type */}
          <Text size='6' weight='bold'>
            Sign up 📝
          </Text>

          {/* Form Fields */}
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

          {/* Form Actions */}
          <Button size='3' disabled={(isSubmitted && !isValid) || isPending}>
            Register
          </Button>

          {/* Form Footer */}
          <Text size='3' align='center'>
            Already have an account? <Link href='/login'>Login</Link>
          </Text>
        </Flex>
      </form>
    </Card>
  );
};

// Login Form Component
interface LoginFormProps {
  onSubmitAction: (data: LoginFormData) => Promise<OnSubmitActionResponse>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitAction }) => {
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
    const validation = loginSchema.safeParse(data);

    if (!validation.success) {
      reset();
      return;
    }

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
          {/* Form Type */}
          <Text size='6' weight='bold'>
            Sign in 🔐
          </Text>

          {/* Form Fields */}
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

          {/* Form Actions */}
          <Button size='3' disabled={(isSubmitted && !isValid) || isPending}>
            Login
          </Button>

          {/* Form Footer */}
          <Text size='3' align='center'>
            Don&apos;t have an account? <Link href='/register'>Sign up</Link>
          </Text>
        </Flex>
      </form>
    </Card>
  );
};
