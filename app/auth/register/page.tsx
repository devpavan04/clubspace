import { RegisterForm } from '@/components/auth/RegisterForm';
import { register } from '@/actions/auth/register';

export default function RegisterPage() {
  return <RegisterForm onSubmitAction={register} />;
}
