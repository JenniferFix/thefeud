import type { Metadata } from 'next';
import { Radio_Canada } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';
import ThemeProvider from '@/components/providers/ThemeProvider';
const importedFont = Radio_Canada({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Feud',
  description: 'Home grown family feud',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={importedFont.className + ' bg-background text-foreground'}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
