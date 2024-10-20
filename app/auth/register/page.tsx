import { RegisterForm } from '@/components/auth/register-form';
import { register as registerServerAction } from '@/actions/auth/register';

export default async function RegisterPage() {
  return <RegisterForm submitServerAction={registerServerAction} />;
}
