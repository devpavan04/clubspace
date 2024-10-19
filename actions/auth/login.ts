'use server';

import { OnSubmitServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import { loginSchema } from '@/schema/auth/schema';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function login({
  email,
  password,
}: LoginFormData): Promise<OnSubmitServerActionResponse> {
  try {
    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      return { errorMessage: validation.error.message };
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { successMessage: 'Welcome! You are logged in.' };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { errorMessage: 'Invalid credentials' };
        default:
          return { errorMessage: 'Something went wrong!' };
      }
    }

    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong!' };
  }
}
