import { LoginForm } from '@/components/auth/LoginForm';
import { login } from '@/actions/auth/login';

export default function LoginPage() {
  return <LoginForm onSubmitAction={login} />;
}
