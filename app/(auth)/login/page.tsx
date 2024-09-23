import { LoginForm } from '@/app/(auth)/_components/LoginForm';
import { login } from '@/app/(auth)/_actions/login';

export default function LoginPage() {
  return <LoginForm onSubmitAction={login} />;
}
