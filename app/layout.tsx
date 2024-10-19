import '@radix-ui/themes/styles.css';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Container, Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import { spaceGrotesk } from '@/config/fonts';

export const metadata: Metadata = {
  title: 'Clubspace',
  description: 'One platform, uniting campus clubs, creating community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={spaceGrotesk.variable}>
      <body
        style={{
          margin: '0',
          padding: '0',
        }}
      >
        <Theme
          accentColor='violet'
          panelBackground='translucent'
          radius='medium'
          appearance='light'
        >
          <Toaster position='top-center' reverseOrder={false} />
          <Container
            size={{
              initial: '1',
              sm: '2',
              lg: '4',
            }}
          >
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  );
}
