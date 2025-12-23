'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function Hero() {
  // Simple, performant scroll handler - CSS does the heavy lifting
  useEffect(() => {
    const header = document.getElementById('site-header');
    const heroWordmark = document.getElementById('hero-wordmark');
    const heroContent = document.getElementById('hero-content');
    const headerLogo = header?.querySelector('[data-logo]') as HTMLElement;
    const headerWordmark = header?.querySelector('[data-header-wordmark]') as HTMLElement;
    const headerWordmarkMobile = header?.querySelector('[data-header-wordmark-mobile]') as HTMLElement;
    
    if (!header || !heroWordmark || !heroContent) return;

    let rafId = 0;
    let lastScrolled: boolean | null = null;

    const applyState = (scrolled: boolean) => {
      if (lastScrolled === scrolled) return;
      lastScrolled = scrolled;

      heroWordmark.setAttribute('data-hidden', scrolled ? 'true' : 'false');
      heroContent.setAttribute('data-visible', scrolled ? 'true' : 'false');

      if (headerLogo) headerLogo.style.opacity = scrolled ? '1' : '0';
      if (headerWordmark) headerWordmark.style.opacity = scrolled ? '1' : '0';
      if (headerWordmarkMobile) headerWordmarkMobile.style.opacity = scrolled ? '1' : '0';
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyState(window.scrollY > 0);
      });
    };

    // Initial state
    onScroll();
    
    // Passive scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Section id="hero" className="bg-bg-primary relative overflow-hidden" removePadding="y">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cta-brass/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta-brass/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative min-h-[calc(100vh-96px)] flex items-center justify-center pt-40 md:pt-20 lg:pt-28 pb-20 md:pb-14">
        {/* Hero Logo - CSS transitions only */}
        <div
          id="hero-wordmark"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-opacity duration-300 ease-out data-[hidden=true]:opacity-0"
          style={{ top: '-20vh', marginTop: '-5vh' }}
        >
          <Image
            src="/header-icon.png"
            alt="Construct Logo"
            width={400}
            height={400}
            priority
            className="h-[22vh] md:h-[30vw] w-auto max-h-[280px] md:max-h-[400px] object-contain"
          />
        </div>

        <Container className="text-center">
          <div
            id="hero-content"
            className="space-y-8 opacity-0 transition-opacity duration-300 ease-out data-[visible=true]:opacity-100 pointer-events-none data-[visible=true]:pointer-events-auto"
          >
            <blockquote className="space-y-3">
              <h1 className="mx-auto font-serif text-[1.75rem] sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none text-text-base whitespace-normal lg:whitespace-nowrap">
                <span className="relative inline-block">
                  <span aria-hidden className="absolute right-full pr-[0.12em]">
                    &ldquo;
                  </span>
                  <span>The brand that builds brands.</span>
                  <span aria-hidden className="absolute left-full pl-[0.12em]">
                    &rdquo;
                  </span>
                </span>
              </h1>
              <cite className="block font-sans text-base md:text-lg text-text-base/60 not-italic text-center">
                <Link href="https://www.linkedin.com/in/ajyawn/" target="_blank" rel="noopener noreferrer" className="hover:text-text-base transition-colors">AJ Yawn</Link>, Best Selling Author
              </cite>
            </blockquote>

            {/* Elegant divider */}
            <div className="w-16 h-px bg-cta-brass mx-auto my-12" />

            {/* Hero paragraph */}
            <p className="text-base md:text-lg text-text-base/70 max-w-3xl mx-auto leading-relaxed">
              We design digital and physical experiences with architectural precision and cultural taste.
            </p>

            <p className="text-base md:text-lg text-text-base/70 max-w-3xl mx-auto leading-relaxed">
              Every form serves a feeling, and every detail is intentional.
            </p>

            <p className="text-base md:text-lg text-text-base/70 max-w-3xl mx-auto leading-relaxed">
              From identity systems to product UX, we help visionary teams build brands that resonate, move, and endure.
            </p>

            {/* Tagline */}
            <p className="font-serif text-2xl md:text-4xl text-cta-brass/80 italic mt-12">
              Experience is the product.
            </p>

            {/* CTA */}
            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-block font-label uppercase tracking-widest text-sm border-2 border-cta-brass text-cta-brass px-10 py-4 rounded-md hover:bg-cta-brass hover:text-bg-primary transition-all duration-300"
              >
                Build with us
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
