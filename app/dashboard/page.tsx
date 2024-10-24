import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
