import { registerSchema, loginSchema } from '@/schema/auth/schema';
import { z } from 'zod';

export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
