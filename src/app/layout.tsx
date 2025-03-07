import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GrupoCubika',
  description: 'Desarrolladora inmobiliaria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
