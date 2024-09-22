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
    <Box style={{ maxWidth: '500px', margin: '20rem auto' }}>
      <Flex direction='column' gap='3' style={{ marginBottom: '1.6rem' }}>
        <Text size='9' weight='bold' className={archivoNarrow.className}>
          clubspace.
        </Text>
        <Text size='4'>One platform, uniting campus clubs, creating community!</Text>
      </Flex>
      {children}
    </Box>
  );
}
