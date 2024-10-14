import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import {
  DEFAULT_LOGGED_IN_REDIRECT,
  DEFAULT_LOGGED_OUT_REDIRECT,
} from '@/constants/routes';

export default async function ProtectedLayout() {
  const session = await auth();
  const isUserLoggedIn = !!session;

  if (!isUserLoggedIn) {
    redirect(DEFAULT_LOGGED_OUT_REDIRECT);
  } else {
    redirect(DEFAULT_LOGGED_IN_REDIRECT);
  }
}
