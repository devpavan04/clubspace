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
import { ChevronsUpDown, Home, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutDropdownMenuItem } from '@/components/dashboard/LogoutDropdownMenuItem';
import { logout as logoutServerAction } from '@/actions/dashboard/logout';
import Link from 'next/link';
import { auth } from '@/auth';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Button } from '@/components/Button';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export const DashboardSidebar: React.FC = async () => {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarHeader className='pt-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='default'
                  className='flex items-center justify-between px-3 py-2 w-full'
                >
                  <p className='text-sm'>{session?.user?.email}</p>
                  <ChevronsUpDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                <LogoutDropdownMenuItem serverAction={logoutServerAction} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
      </SidebarFooter>
    </Sidebar>
  );
};
