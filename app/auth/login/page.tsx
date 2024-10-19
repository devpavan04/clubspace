import { LoginForm } from '@/components/auth/LoginForm';
import { login as loginServerAction } from '@/actions/auth/login';

export default async function LoginPage() {
  return <LoginForm submitServerAction={loginServerAction} />;
}
