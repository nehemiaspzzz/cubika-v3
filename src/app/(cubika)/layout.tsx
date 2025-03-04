import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../../src/app/globals.css";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cubika",
  description: "Construyendo el futuro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
