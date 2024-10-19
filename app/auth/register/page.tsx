import { RegisterForm } from '@/components/auth/RegisterForm';
import { register as registerServerAction } from '@/actions/auth/register';

export default async function RegisterPage() {
  return <RegisterForm submitServerAction={registerServerAction} />;
}
