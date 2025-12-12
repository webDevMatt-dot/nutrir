import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nutrir.netlify.app'),
  title: {
    template: '%s | Nutrir',
    default: 'Nutrir | Science-Aligned Natural Health',
  },
  description: 'Premium supplements bridging the gap between effective clinical research and natural wellness.',
  openGraph: {
    title: 'Nutrir | Science-Aligned Natural Health',
    description: 'Premium supplements bridging the gap between effective clinical research and natural wellness.',
    url: 'https://nutrir.netlify.app',
    siteName: 'Nutrir',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Nutrir Logo Card',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icon',
  },
};

import AnnouncementBar from "./components/AnnouncementBar";

import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <AnnouncementBar />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
