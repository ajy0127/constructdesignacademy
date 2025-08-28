'use client';

import Link from 'next/link';
import Container from './Container';

const socialLinks = [
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-offwhite text-black/70">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div>
            <h3 className="font-serif text-xl text-black mb-4">Construct</h3>
            <p className="body-sm text-black/80">Engineered Elegance</p>
          </div>
          <div>
            <h3 className="eyebrow text-black mb-4">Sitemap</h3>
            <ul className="space-y-2 body-sm text-black/80">
              <li><Link href="/" className="hover:text-cta-brass">Home</Link></li>
              <li><Link href="/expertise" className="hover:text-cta-brass">Expertise</Link></li>
              <li><Link href="/values" className="hover:text-cta-brass">Values</Link></li>
              <li><Link href="/contact" className="hover:text-cta-brass">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-black mb-4">Connect</h3>
            <div className="flex space-x-6 body-sm text-black/80">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} className="hover:text-cta-brass">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-cta-brass/20 py-8 text-center body-sm text-black/70">
          <p>&copy; {new Date().getFullYear()} Construct. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}