import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export const Icon = ({ icon: IconComponent, className }: IconProps) => {
  return <IconComponent className={cn('!w-5 !h-5', className)} />;
};
