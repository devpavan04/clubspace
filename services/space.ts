import { db } from '@/lib/db';
import { DatabaseQueryResponse } from '@/types/types';
import { Space } from '@prisma/client';

export const getSpacesByUserId = async (
  id: string,
): Promise<DatabaseQueryResponse<Space[]>> => {
  try {
    const spaces = await db.space.findMany({
      where: {
        ownerId: id,
      },
    });

    return { data: spaces, success: true, message: 'Spaces found' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, success: false, message: error.message };
    }

    return {
      data: null,
      success: false,
      message: 'An unknown error occurred',
    };
  }
};
