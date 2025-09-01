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
      className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur transition-all duration-300"
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

        {/* Mobile Side Drawer Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[9999]">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Side Drawer */}
            <div className={clsx(
              "absolute right-0 top-0 h-full w-80 max-w-[85vw]",
              "bg-cta-brass",
              "shadow-2xl transform transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/20">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/header-icon.png" 
                    alt="Construct Logo"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-serif uppercase tracking-[0.2em] text-sm text-black font-medium">
                    CONSTRUCT
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:text-black/70 transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-8 px-6 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block text-lg font-medium transition-colors duration-200',
                      'text-black hover:text-black/70',
                      pathname === item.href && 'text-black font-semibold'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Contact Button */}
                <div className="pt-4 border-t border-black/20">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 px-6 bg-black text-cta-brass font-medium rounded-sm hover:bg-black/90 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}