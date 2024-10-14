import { LoginForm } from '@/components/auth/LoginForm';
import { login } from '@/actions/auth/login';

export default async function LoginPage() {
  return <LoginForm onSubmitAction={login} />;
}
