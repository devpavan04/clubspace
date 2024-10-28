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
import {
  ChevronsUpDown,
  Settings,
  Globe,
  LayoutGrid,
  CircleUser,
} from 'lucide-react';
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
import { getUserById } from '@/services/user';

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
  const { success, data: user } = await getUserById(session?.user?.id ?? '');
  const name = success ? `${user?.firstName} ${user?.lastName}` : '';

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
                  className='flex items-center justify-between px-2 py-5 w-full font-medium'
                >
                  <div className='flex items-center gap-2'>
                    <CircleUser />
                    <Span>{name}</Span>
                  </div>
                  <ChevronsUpDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width] p-1'>
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
