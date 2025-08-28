'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/values', label: 'Values' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      id="site-header"
      className="sticky top-0 z-[1000] bg-bg-primary/50 backdrop-blur transition-all duration-300"
      style={{
        height: '96px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left - Small wordmark fades in when scrolled */}
          <Link href="/" className="flex items-center h-full space-x-3">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <img 
                src="/header-icon.png" 
                alt="Construct Logo"
                className="h-full w-auto absolute transition-opacity duration-300"
                style={{
                  opacity: 0,
                  objectFit: 'contain',
                  willChange: 'opacity'
                }}
                data-logo
              />
            </div>
            <span 
              data-header-wordmark
              className="font-serif uppercase tracking-[0.2em] text-sm text-text-base transition-opacity duration-300 opacity-0"
              style={{
                willChange: 'opacity'
              }}
            >
              CONSTRUCT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'eyebrow transition-colors duration-200',
                  'text-text-base/80 hover:text-text-base'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="cta-button"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-base hover:text-cta-brass transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-text-base/10">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block px-3 py-2 eyebrow transition-colors duration-200',
                    'text-text-base/80 hover:text-text-base'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="cta-button inline-block mx-3 my-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}