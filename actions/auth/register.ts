'use server';

import { ServerActionResponse } from '@/types/types';
import { RegisterFormData } from '@/types/auth/types';
import { registerSchema } from '@/schema/auth/schema';
import { db } from '@/lib/db';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/services/user';

export async function register({
  name,
  email,
  password,
}: RegisterFormData): Promise<ServerActionResponse> {
  try {
    const validation = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const { data: existingUser } = await getUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: 'Email already in use',
      };
    }

    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: 'Registered successfully',
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
      message: 'Something went wrong',
    };
  }
}
