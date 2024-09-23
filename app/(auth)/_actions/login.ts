'use server';

import { LoginFormData, OnSubmitActionResponse } from '@/app/(auth)/types';
import { loginSchema } from '@/app/(auth)/schema';

export async function login({
  email,
  password,
}: LoginFormData): Promise<OnSubmitActionResponse> {
  try {
    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      return { errorMessage: validation.error.errors[0].message };
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email, password });
      }, 1000);
    });

    return { successMessage: 'Successfully logged in!' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong!' };
  }
}
