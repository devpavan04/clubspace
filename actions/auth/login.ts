'use server';

import { OnSubmitServerActionResponse } from '@/types/types';
import { LoginFormData } from '@/types/auth/types';
import { loginSchema } from '@/schema/auth/schema';

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
