import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
  description: 'Settings',
};


export default async function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
