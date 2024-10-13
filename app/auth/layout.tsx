import type { Metadata } from 'next';
import { Text, Flex, Box } from '@radix-ui/themes';
import { archivoNarrow } from '@/config/fonts';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Login or sign up to access your account',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex justify='center' align='center' minHeight='100vh'>
      <Box
        width={{
          initial: '400px',
          sm: '500px',
          lg: '600px',
        }}
      >
        <Flex direction='column' gap='3' mb='6'>
          <Text size='9' weight='bold' className={archivoNarrow.className}>
            clubspace.
          </Text>
          <Text size='4'>
            One platform, uniting campus clubs, creating community!
          </Text>
        </Flex>
        {children}
      </Box>
    </Flex>
  );
}
