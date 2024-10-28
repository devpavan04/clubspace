import {
  ButtonProps as ButtonUIProps,
  Button as ButtonUI,
} from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

type ButtonProps = ButtonUIProps & {
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <ButtonUI {...props}>
      {isLoading ? <Icon icon={Loader2} className='animate-spin' /> : children}
    </ButtonUI>
  );
};
