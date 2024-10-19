'use server';

import { OnSubmitServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import { loginSchema } from '@/schema/auth/schema';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { DEFAULT_LOGGED_IN_REDIRECT } from '@/constants/routes';

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
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });

    return { successMessage: 'Successfully logged in!' };
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
