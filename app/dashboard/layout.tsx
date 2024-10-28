import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className='px-4 py-6'>
      <DashboardSidebar />
      <SidebarTrigger />
      <main className='w-full md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px] min-h-screen mx-auto px-4'>
        {children}
      </main>
    </SidebarProvider>
  );
}
