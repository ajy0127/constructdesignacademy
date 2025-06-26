import '../styles/globals.css';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Construct - The brand that builds brands.',
  description: 'Construct is a luxury design studio that builds brands. We specialize in crafting digital flagships, bespoke e-commerce experiences, and immersive product storytelling.',
  keywords: ['luxury design', 'brand development', 'web design', 'e-commerce', 'UX/UI'],
  authors: [{ name: 'Construct' }],
  creator: 'Construct',
  openGraph: {
    title: 'Construct - The brand that builds brands.',
    description: 'Construct is a luxury design studio that builds brands.',
    url: 'https://constructdesignacademy.com',
    siteName: 'Construct',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Construct - The brand that builds brands.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construct - The brand that builds brands.',
    description: 'Construct is a luxury design studio that builds brands.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/conlogo.png',
    shortcut: '/conlogo.png',
    apple: '/conlogo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg-primary text-text-base antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}