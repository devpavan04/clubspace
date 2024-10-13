import { db } from '@/lib/db';
import { DataResponse } from '@/types/types';
import { User } from '@prisma/client';

export const getUserByEmail = async (
  email: string,
): Promise<DataResponse<User>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { data: null, errorMessage: 'User not found' };
    }

    return { data: user, successMessage: 'User found' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, errorMessage: error.message };
    }

    return { data: null, errorMessage: 'An unknown error occurred' };
  }
};

export const getUserById = async (id: string): Promise<DataResponse<User>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return { data: null, errorMessage: 'User not found' };
    }

    return { data: user, successMessage: 'User found' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, errorMessage: error.message };
    }

    return { data: null, errorMessage: 'An unknown error occurred' };
  }
};

export const getTotalUsersCount = async (): Promise<DataResponse<number>> => {
  try {
    const totalUsers = await db.user.count();

    return { data: totalUsers, successMessage: 'Total users fetched' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, errorMessage: error.message };
    }

    return { data: null, errorMessage: 'An unknown error occurred' };
  }
};

export const getAllUsers = async (): Promise<DataResponse<User[]>> => {
  try {
    const users = await db.user.findMany();

    return { data: users, successMessage: 'Users fetched' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, errorMessage: error.message };
    }

    return { data: null, errorMessage: 'An unknown error occurred' };
  }
};
