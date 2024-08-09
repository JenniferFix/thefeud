import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import ThemeProvider from "@/components/providers/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Feud",
  description: "Home grown family feud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <ThemeProvider>{children}</ThemeProvider>
          </main>
        </body>
      </html>
    </Providers>
  );
}
