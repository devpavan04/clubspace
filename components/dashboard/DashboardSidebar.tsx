import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenu,
  SidebarGroupContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Settings, Globe, LayoutGrid } from 'lucide-react';
import { LogoutDropdownMenuItem } from '@/components/dashboard/LogoutDropdownMenuItem';
import { logout as logoutServerAction } from '@/actions/dashboard/logout';
import Link from 'next/link';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Heading } from '@/components/Heading';
import { archivoNarrow } from '@/config/fonts';

const items = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Spaces',
    url: '/dashboard/spaces',
    icon: Globe,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export const DashboardSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className='pt-4'>
        <Heading variant='h1' className={archivoNarrow.className + ' px-2'}>
          clubspace.
        </Heading>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className='!w-5 !h-5' />
                      <span className='text-sm md:text-base'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggleButton />
        <LogoutDropdownMenuItem serverAction={logoutServerAction} />
      </SidebarFooter>
    </Sidebar>
  );
};
