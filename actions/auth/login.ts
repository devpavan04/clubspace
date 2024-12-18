'use server';

import { ServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import { loginSchema } from '@/schema/auth/schema';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

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
      redirect: false,
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error: unknown) {
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
