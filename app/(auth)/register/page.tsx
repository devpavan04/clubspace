import { RegisterForm } from '@/app/(auth)/_components/RegisterForm';
import { register } from '@/app/(auth)/_actions/register';

export default function RegisterPage() {
  return <RegisterForm onSubmitAction={register} />;
}
