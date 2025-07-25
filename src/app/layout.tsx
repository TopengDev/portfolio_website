import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'Christopher Indrawan',
   description: "Christopher Indrawan's Portfolio Website",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className="dark scroll-smooth snap-mandatory snap-y">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
         >
            {children}
         </body>
      </html>
   );
}
