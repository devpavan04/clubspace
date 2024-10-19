import { auth, signOut } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes';
import { Button } from '@radix-ui/themes';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {JSON.stringify(session)}</p>

      <form
        action={async () => {
          'use server';

          await signOut({
            redirectTo: DEFAULT_LOGIN_REDIRECT,
          });
        }}
      >
        <Button type='submit'> Sign out</Button>
      </form>
    </div>
  );
}
