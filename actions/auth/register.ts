'use server';

import { OnSubmitServerActionResponse } from '@/types/types';
import { RegisterFormData } from '@/types/auth/types';
import { registerSchema } from '@/schema/auth/schema';
import {db} from '@/lib/db';
import bcryptjs from 'bcryptjs';

export async function register({
  name,
  email,
  password,
}: RegisterFormData): Promise<OnSubmitServerActionResponse> {
  try {
    const validation = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!validation.success) {
      return { errorMessage: validation.error.message };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { errorMessage: 'Email already in use' };
    }

    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return { successMessage: 'Registered successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Something went wrong' };
  }
}
