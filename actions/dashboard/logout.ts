'use server';

import { ServerActionResponse } from '@/types/types';
import { signOut } from '@/auth';

export async function logout(): Promise<ServerActionResponse> {
  try {
    await signOut({ redirect: false });

    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Logout failed',
    };
  }
}
