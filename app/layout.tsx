import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Container, Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Clubspace',
  description: 'One platform, uniting campus clubs, creating community. 🎓🤝🌟',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <Theme accentColor='violet' panelBackground='solid' radius='medium'>
          <Container size='4'>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  );
}
