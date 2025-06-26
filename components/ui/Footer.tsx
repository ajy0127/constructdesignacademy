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
    <footer className="bg-bg-sub text-text-base/60">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div>
            <h3 className="font-serif text-xl text-text-base mb-4">Construct</h3>
            <p className="font-sans text-sm">The brand that builds brands.</p>
          </div>
          <div>
            <h3 className="font-label uppercase tracking-widest text-sm text-text-base mb-4">Sitemap</h3>
            <ul className="font-sans text-sm space-y-2">
              <li><Link href="#hero" className="hover:text-text-base">Home</Link></li>
              <li><Link href="#expertise" className="hover:text-text-base">Expertise</Link></li>
              <li><Link href="#pillars" className="hover:text-text-base">Values</Link></li>
              <li><Link href="#contact" className="hover:text-text-base">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-label uppercase tracking-widest text-sm text-text-base mb-4">Connect</h3>
            <div className="flex space-x-6">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} className="hover:text-text-base">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-text-base/10 py-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Construct. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}