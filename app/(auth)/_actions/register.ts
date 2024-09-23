'use server';

import { RegisterFormData, OnSubmitActionResponse } from '@/app/(auth)/types';
import { registerSchema } from '@/app/(auth)/schema';

export async function register({
  email,
  password,
}: RegisterFormData): Promise<OnSubmitActionResponse> {
  try {
    const validation = registerSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      return { errorMessage: validation.error.message };
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email, password });
      }, 1000);
    });

    return { successMessage: 'Successfully registered!' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong!' };
  }
}
