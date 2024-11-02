import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { poppins } from '@/config/fonts';
import { ThemeProvider } from '@/components/ThemeProvider';

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
    <html lang='en' className={poppins.className} suppressHydrationWarning>
      <body>
        <Toaster position='top-right' reverseOrder={false} />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
