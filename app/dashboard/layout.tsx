import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className='px-4 py-6 h-screen overflow-hidden'>
      <DashboardSidebar />
      <SidebarTrigger className='mt-1' />
      <main className='w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl h-[calc(100vh-3rem)] overflow-y-auto mx-auto px-4 scrollbar-hidden'>
        {children}
      </main>
    </SidebarProvider>
  );
}
