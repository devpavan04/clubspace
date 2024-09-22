import { LoginForm } from '@/app/(auth)/components';
import { login } from '@/app/(auth)/actions';

export default function LoginPage() {
  return <LoginForm onSubmitAction={login} />;
}
