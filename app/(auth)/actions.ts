'use server';

import {
  RegisterFormData,
  LoginFormData,
  OnSubmitActionResponse,
} from '@/app/(auth)/types';

// Register Action
export async function register({
  email,
  password,
}: RegisterFormData): Promise<OnSubmitActionResponse> {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email, password });
      }, 1000);
    });

    // throw new Error('Oops! Something went wrong!');

    return { successMessage: 'Successfully registered!' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong!' };
  }
}

// Login Action
export async function login({
  email,
  password,
}: LoginFormData): Promise<OnSubmitActionResponse> {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email, password });
      }, 1000);
    });

    // throw new Error('Oops! Something went wrong!');

    return { successMessage: 'Successfully logged in!' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong!' };
  }
}
