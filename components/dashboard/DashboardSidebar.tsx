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
import { ChevronsUpDown, Settings, Globe, LayoutGrid } from 'lucide-react';
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
import { Span } from '@/components/Span';

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
                  <Span>{session?.user?.email}</Span>
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
                      <Span>{item.title}</Span>
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
