import { registerSchema, loginSchema } from '@/app/(auth)/schema';
import { z } from 'zod';

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export type OnSubmitActionResponse = {
  successMessage?: string;
  errorMessage?: string;
};
