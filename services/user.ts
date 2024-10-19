import { db } from '@/lib/db';
import { DatabaseQueryResponse } from '@/types/types';
import { User } from '@prisma/client';

export const getUserByEmail = async (
  email: string,
): Promise<DatabaseQueryResponse<User>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { data: null, success: false, message: 'User not found' };
    }

    return { data: user, success: true, message: 'User found' };
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

export const getUserById = async (
  id: string,
): Promise<DatabaseQueryResponse<User>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return { data: null, success: false, message: 'User not found' };
    }

    return { data: user, success: true, message: 'User found' };
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

export const getTotalUsersCount = async (): Promise<
  DatabaseQueryResponse<number>
> => {
  try {
    const totalUsers = await db.user.count();

    return {
      data: totalUsers,
      success: true,
      message: 'Total users fetched',
    };
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

export const getAllUsers = async (): Promise<DatabaseQueryResponse<User[]>> => {
  try {
    const users = await db.user.findMany();

    return { data: users, success: true, message: 'Users fetched' };
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
