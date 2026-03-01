import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/data/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollFadeInit from '@/components/ScrollFadeInit';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: '/images/brand/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollFadeInit />
      </body>
    </html>
  );
}
