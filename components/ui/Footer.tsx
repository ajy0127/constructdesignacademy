'use client';

import Link from 'next/link';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-bg-offwhite text-black/70">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 md:items-start">
          {/* Brand Column */}
          <div className="flex flex-col text-center md:text-left">
            <h3 className="font-serif text-xl text-black mb-3">Construct</h3>
            <p className="body-sm text-black/80">Engineered Elegance</p>
          </div>
          
          {/* Sitemap Column - Centered */}
          <div className="flex flex-col items-center text-center">
            <h3 className="eyebrow text-black mb-4">Sitemap</h3>
            <ul className="space-y-2.5 body-sm text-black/80">
              <li><Link href="/" className="hover:text-cta-brass transition-colors">Home</Link></li>
              <li><Link href="/expertise" className="hover:text-cta-brass transition-colors">Expertise</Link></li>
              <li><Link href="/values" className="hover:text-cta-brass transition-colors">Values</Link></li>
              <li><Link href="/portfolio" className="hover:text-cta-brass transition-colors">Products</Link></li>
              <li><Link href="/contact" className="hover:text-cta-brass transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Connect Column */}
          <div className="flex flex-col items-center md:items-end">
            <Link
              href="/contact"
              className="inline-block font-label uppercase tracking-widest text-sm border border-black text-black px-6 py-3 rounded-md hover:bg-black hover:text-bg-offwhite transition-colors w-fit"
            >
              Connect
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-cta-brass/20 py-8 text-center body-sm text-black/70">
          <p>&copy; {new Date().getFullYear()} Construct. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}