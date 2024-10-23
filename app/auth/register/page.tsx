import { RegisterForm } from '@/components/auth/RegisterForm';
import { register as registerServerAction } from '@/actions/auth/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clubspace | Register',
  description: 'Create an account',
};

export default async function RegisterPage() {
  return <RegisterForm serverAction={registerServerAction} />;
}
