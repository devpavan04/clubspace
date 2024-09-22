import { RegisterForm } from '@/app/(auth)/components';
import { register } from '@/app/(auth)/actions';

export default function RegisterPage() {
  return <RegisterForm onSubmitAction={register} />;
}
