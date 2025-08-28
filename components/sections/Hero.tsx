'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function Hero() {
  // Enhanced scroll behavior with smoother transitions
  useEffect(() => {
    const header = document.getElementById('site-header');
    const heroWordmark = document.getElementById('hero-wordmark');
    const headerWordmark = header?.querySelector('[data-header-wordmark]');
    const heroContent = document.getElementById('hero-content');
    const hero = document.getElementById('hero');
    
    if (!header || !heroWordmark || !headerWordmark || !heroContent || !hero) return;

    // No need for these constants with immediate transition

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      // Get header elements
      const headerLogo = header.querySelector('[data-logo]') as HTMLElement;
      
      // Update header state - immediate transition when scrolling starts
      const isScrolled = scrollY > 1;
      header.dataset.scrolled = isScrolled.toString();
      
      // Calculate progress (0 or 1 for immediate transition)
      const progress = Math.min(1, scrollY / 20);
      
      // Hero wordmark - immediate fade out
      heroWordmark.style.opacity = (1 - progress).toString();
      heroWordmark.style.pointerEvents = isScrolled ? 'none' : 'auto';
      
      // Header elements - immediate fade in
      if (headerLogo) {
        headerLogo.style.opacity = progress.toString();
      }
      if (headerWordmark) {
        (headerWordmark as HTMLElement).style.opacity = progress.toString();
      }
      
      // Content - always visible unless at very top
      const contentOpacity = scrollY === 0 ? 0 : 1;
      heroContent.style.opacity = contentOpacity.toString();
      heroContent.style.pointerEvents = isScrolled ? 'auto' : 'none';
      
      // Update header height with smooth transition
      header.style.height = `${96 - (32 * Math.min(1, scrollY / 120))}px`;
    };

    // Initial state
    updateScrollState();
    
    // Add event listeners
    const onScroll = () => requestAnimationFrame(updateScrollState);
    const onResize = () => requestAnimationFrame(updateScrollState);
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <Section id="hero" className="bg-bg-primary" removePadding="y">
      <div className="relative min-h-[calc(100vh-96px)] flex items-center pt-12 md:pt-20 lg:pt-28 pb-10 md:pb-14">
        {/* Large hero icon */}
        <div
          id="hero-wordmark"
          aria-hidden="true"
          className="absolute inset-0 m-auto will-change-transform will-change-opacity select-none pointer-events-none transition-all duration-500 flex items-center justify-center"
        >
          <img 
            src="/header-icon.png" 
            alt="Construct Logo"
            className="h-[30vw] w-auto max-h-[400px] transition-opacity duration-500"
            style={{
              opacity: 1,
              willChange: 'opacity, transform',
              objectFit: 'contain'
            }}
          />
        </div>
        <Container className="text-center">
          <div
            id="hero-content"
            className="space-y-8 opacity-0 data-[in=true]:opacity-100 transition-opacity duration-300 pointer-events-none data-[in=true]:pointer-events-auto"
          >
            <blockquote className="space-y-4">
              <h1 className="heading-display md:whitespace-nowrap">
                "The brand that builds brands."
              </h1>
              <cite className="block font-sans text-lg md:text-xl text-text-base/60 not-italic text-center">
                — <a href="https://www.linkedin.com/in/ajyawn/" target="_blank" rel="noopener noreferrer" className="hover:text-text-base transition-colors underline">AJ Yawn</a>, Best Selling Author
              </cite>
            </blockquote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <p className="lead leading-relaxed">
                CONSTRUCT, the "brand that builds brands." We design digital and physical experiences with architectural precision and cultural taste. Where form serves feeling, and every detail is intentional. From identity systems to product UX, we help visionary teams build brands that resonate, move, and last.
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="lead"
            >
              Experience is the product.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="pt-8"
            >
              <Link
                href="/contact"
                className="cta-button"
              >
                Build with us →
              </Link>
            </motion.div>
          </div>
        </Container>
        {/* Scroll sentinel at bottom of hero */}
        <div id="hero-sentinel" className="absolute bottom-0 left-0 right-0 h-[1px]" />
      </div>
    </Section>
  );
}