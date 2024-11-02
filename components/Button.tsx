import {
  ButtonProps as ButtonUIProps,
  Button as ButtonUI,
} from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
      {isLoading ? <Loader2 className='animate-spin !w-4 !h-4' /> : children}
    </ButtonUI>
  );
};
