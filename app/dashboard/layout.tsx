import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className='p-4'>
      <DashboardSidebar />
      <SidebarTrigger />
      <main className='w-full md:w-[500px] lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] min-h-screen mx-auto px-4'>
        {children}
      </main>
    </SidebarProvider>
  );
}
