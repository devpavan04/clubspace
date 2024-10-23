import { LoginForm } from '@/components/auth/LoginForm';
import { login as loginServerAction } from '@/actions/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clubspace | Login',
  description: 'Login to your account',
};

export default async function LoginPage() {
  return <LoginForm serverAction={loginServerAction} />;
}
