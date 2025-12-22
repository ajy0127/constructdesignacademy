'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { navItems, ctaButton } from '../../config/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change (prevents stuck overlay / locked scroll)
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    document.body.style.overflow = 'unset';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close menu on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
    <header
      id="site-header"
      className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur transition-all duration-300 flex items-center"
      style={{
        height: '96px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-full">
          {/* Desktop - Logo + wordmark on left */}
          <Link href="/" className="hidden md:flex items-center h-full space-x-3">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <Image
                src="/header-icon.png"
                alt="Construct Logo"
                fill
                sizes="32px"
                className="absolute transition-opacity duration-300"
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

          {/* Mobile - Spacer for left side to balance centering */}
          <div className="md:hidden w-10" />

          {/* Mobile - Centered CONSTRUCT text */}
          <div className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span 
              data-header-wordmark-mobile
              className="font-serif uppercase tracking-[0.2em] text-sm text-text-base transition-opacity duration-300 opacity-0"
              style={{
                willChange: 'opacity'
              }}
            >
              CONSTRUCT
            </span>
          </div>

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
              href={ctaButton.href}
              className="cta-button"
            >
              {ctaButton.label}
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
      </div>
    </header>

          {/* Mobile Fullscreen Menu - Outside header */}
    {isOpen && (
      <div className="md:hidden fixed inset-0 z-[100] bg-bg-primary">
        {/* Close Button - Top Right */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-base/60 hover:text-text-base transition-colors p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content - Centered */}
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/header-icon.png"
              alt="Construct Logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain opacity-40"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6 text-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block font-serif text-3xl transition-colors duration-200',
                    pathname === item.href 
                      ? 'text-text-base' 
                      : 'text-text-base/60 hover:text-text-base'
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Connect Button */}
          <div className="mt-12">
            <Link
              href={ctaButton.href}
              onClick={() => setIsOpen(false)}
              className="inline-block font-label uppercase tracking-widest text-sm border border-cta-brass text-cta-brass px-8 py-3 rounded-md hover:bg-cta-brass hover:text-bg-primary transition-colors"
            >
              {ctaButton.label}
            </Link>
          </div>
        </div>
      </div>
    )}
    </>
  );
}