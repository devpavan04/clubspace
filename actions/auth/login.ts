'use server';

import { ServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import { loginSchema } from '@/schema/auth/schema';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
// import { DEFAULT_LOGGED_IN_REDIRECT } from '@/constants/routes';

export async function login({
  email,
  password,
}: LoginFormData): Promise<ServerActionResponse> {
  try {
    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    await signIn('credentials', {
      email,
      password,
      // redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
      redirect: false,
    });

    return {
      success: true,
      message: 'Successfully logged in!',
    };
  } catch (error: unknown) {
    console.error('Login error:', error);

    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid credentials',
          };
        default:
          return {
            success: false,
            message: 'Something went wrong!',
          };
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
}
