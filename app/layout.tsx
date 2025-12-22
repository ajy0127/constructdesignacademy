import '../styles/globals.css';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';

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
  metadataBase: new URL('https://constructdesignacademy.com'),
  title: {
    default: 'Construct by Con',
    template: '%s | Construct by Con'
  },
  description: 'Elite design studio crafting luxury brand experiences with architectural precision. We design digital and physical experiences that resonate, move, and endure.',
  keywords: [
    'luxury design studio',
    'brand development',
    'UX/UI design',
    'web design agency',
    'e-commerce design',
    'brand strategy',
    'digital experiences',
    'luxury branding',
    'design systems',
    'Next.js development',
    'TypeScript',
    'premium web design'
  ],
  authors: [{ name: 'Construct', url: 'https://constructdesignacademy.com' }],
  creator: 'Construct',
  publisher: 'Construct',
  category: 'Design & Development',
  openGraph: {
    title: 'Construct - The Brand That Builds Brands',
    description: 'Elite design studio crafting luxury brand experiences with architectural precision. We design digital and physical experiences that resonate, move, and endure.',
    url: 'https://constructdesignacademy.com',
    siteName: 'Construct',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Construct - Elite Design Studio',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construct - The Brand That Builds Brands',
    description: 'Elite design studio crafting luxury brand experiences with architectural precision.',
    images: ['/og-image.png'],
    creator: '@construct',
    site: '@construct',
  },
  alternates: {
    canonical: 'https://constructdesignacademy.com',
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg-primary text-text-base antialiased relative">
        <GoogleAnalytics />
        {/* Subtle background pattern */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(194, 163, 118) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cta-brass focus:text-bg-primary focus:rounded-md"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}