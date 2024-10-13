import { db } from '@/lib/db';
import { DataResponse } from '@/types/types';
import { User } from '@prisma/client';

export const getUserByEmail = async (
  email: string,
): Promise<DataResponse<User | null>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { errorMessage: 'User not found', data: null };
    }

    return { data: user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message, data: null };
    }

    return { errorMessage: 'An unknown error occurred', data: null };
  }
};
