import '../styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CONSTRUCT - Built to be felt',
  description: 'Design & Digital for the Discerning. Construct is the brand that builds brands.',
  keywords: ['luxury design', 'digital transformation', 'brand development', 'web design'],
  authors: [{ name: 'Construct' }],
  creator: 'Construct',
  openGraph: {
    title: 'CONSTRUCT - Built to be felt',
    description: 'Design & Digital for the Discerning. Construct is the brand that builds brands.',
    url: 'https://byconstruct.com',
    siteName: 'Construct',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Construct - Built to be felt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CONSTRUCT - Built to be felt',
    description: 'Design & Digital for the Discerning',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/conlogo.png',
    shortcut: '/conlogo.png',
    apple: '/conlogo.png',
  },
};

import Navigation from '../components/ui/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ivory-mist text-charcoal-black antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}