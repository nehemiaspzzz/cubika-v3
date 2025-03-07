import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrupoCubika | Desarrolladora Inmobiliaria en Guatemala",
  description: "Somos una corporación guatemalteca especializada en desarrollo inmobiliario sostenible. Construimos hogares y comunidades con innovación y compromiso ambiental.",
  keywords: "Grupo Cubika, desarrolladora inmobiliaria, Guatemala, bienes raíces, proyectos inmobiliarios, construcción sostenible, Arboleda Los Encinos, viviendas sostenibles",
  authors: [{ name: "GrupoCubika" }],
  openGraph: {
    title: "Grupo Cubika | Desarrolladora Inmobiliaria en Guatemala",
    description: "Transformamos terrenos en hogares sostenibles con diseño innovador y compromiso ambiental en Guatemala",
    url: "https://www.grupocubika.com",
    siteName: "Grupo Cubika",
    locale: "es_GT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Cubika | Desarrolladora Inmobiliaria en Guatemala",
    description: "Transformamos terrenos en hogares sostenibles con diseño innovador y compromiso ambiental en Guatemala",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Reemplazar con el código real
  },
  alternates: {
    canonical: "https://www.cubika.com.gt",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
