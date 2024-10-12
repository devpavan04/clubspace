import { Archivo_Narrow, Space_Grotesk } from 'next/font/google';

export const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo-narrow',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});
