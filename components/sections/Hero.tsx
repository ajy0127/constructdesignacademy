'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function Hero() {
  // Smooth lazy scroll behavior with easing
  useEffect(() => {
    const header = document.getElementById('site-header');
    const heroWordmark = document.getElementById('hero-wordmark');
    const headerWordmark = header?.querySelector('[data-header-wordmark]');
    const heroContent = document.getElementById('hero-content');
    
    if (!header || !heroWordmark || !headerWordmark || !heroContent) return;

    // Detect mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // Smooth easing function
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t); // Faster easing for mobile
    
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const headerLogo = header.querySelector('[data-logo]') as HTMLElement;
      const isScrolled = scrollY > 1;
      
      // Mobile: Ultra-fast transition (0-15px). Desktop: Quick (0-30px)
      const logoFadeRange = isMobile ? 15 : 30;
      const logoProgress = Math.min(1, scrollY / logoFadeRange);
      const easedProgress = isMobile ? easeOutQuad(logoProgress) : easeOutCubic(logoProgress);
      
      // Hero wordmark - instant fade on mobile, quick on desktop
      heroWordmark.style.opacity = (1 - easedProgress).toString();
      heroWordmark.style.transform = `scale(${1 - logoProgress * 0.05}) translateY(${logoProgress * -10}px)`;
      heroWordmark.style.pointerEvents = isScrolled ? 'none' : 'auto';
      
      // Header elements - synchronized fade in
      if (headerLogo) {
        headerLogo.style.opacity = easedProgress.toString();
      }
      if (headerWordmark) {
        (headerWordmark as HTMLElement).style.opacity = easedProgress.toString();
      }
      
      // Content - immediate fade on mobile (5px start), slightly delayed on desktop (10px)
      const contentStart = isMobile ? 5 : 10;
      const contentRange = isMobile ? 25 : 40;
      const contentProgress = Math.max(0, Math.min(1, (scrollY - contentStart) / contentRange));
      const contentOpacity = isMobile ? easeOutQuad(contentProgress) : easeOutCubic(contentProgress);
      heroContent.style.opacity = contentOpacity.toString();
      heroContent.style.pointerEvents = contentOpacity > 0.5 ? 'auto' : 'none';
      
      // Quick header height transition
      const heightRange = isMobile ? 40 : 60;
      const heightProgress = Math.min(1, scrollY / heightRange);
      header.style.height = `${96 - (32 * easeOutCubic(heightProgress))}px`;
    };

    // Initial state
    updateScrollState();
    
    // Throttled scroll handler for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);
  return (
    <Section id="hero" className="bg-bg-primary relative overflow-hidden" removePadding="y">
      {/* Subtle gradient orb for visual interest */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cta-brass/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta-brass/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative min-h-[calc(100vh-96px)] flex items-center justify-center pt-40 md:pt-20 lg:pt-28 pb-20 md:pb-14">
        {/* Large hero icon */}
        <div
          id="hero-wordmark"
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center will-change-transform will-change-opacity select-none pointer-events-none"
          style={{ top: '-20vh', marginTop: '-5vh' }}
        >
          <img 
            src="/header-icon.png" 
            alt="Construct Logo"
            className="h-[22vh] md:h-[30vw] w-auto max-h-[280px] md:max-h-[400px]"
            style={{
              opacity: 1,
              willChange: 'opacity, transform',
              objectFit: 'contain'
            }}
          />
        </div>
        <Container className="text-center px-6 md:px-8">
          <div
            id="hero-content"
            className="space-y-8 opacity-0 data-[in=true]:opacity-100 transition-opacity duration-300 pointer-events-none data-[in=true]:pointer-events-auto"
          >
            <blockquote className="space-y-3">
              <h1 className="font-serif text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none text-text-base px-4">
                &ldquo;The brand that builds brands.&rdquo;
              </h1>
              <cite className="block font-sans text-base md:text-lg text-text-base/60 not-italic text-center">
                <a href="https://www.linkedin.com/in/ajyawn/" target="_blank" rel="noopener noreferrer" className="hover:text-text-base transition-colors">AJ Yawn</a>, Best Selling Author
              </cite>
            </blockquote>
            {/* Elegant divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-16 h-px bg-cta-brass mx-auto my-12"
            />

            {/* Body copy with refined typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <p className="text-lg md:text-xl leading-relaxed text-text-base/80 font-light">
                We design digital and physical experiences with architectural precision and cultural taste.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-text-base/80 font-light">
                Every form serves a feeling, and every detail is intentional.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-text-base/80 font-light">
                From identity systems to product UX, we help visionary teams build brands that resonate, move, and endure.
              </p>
              
              {/* Tagline with emphasis */}
              <div className="pt-6">
                <p className="text-xl md:text-2xl font-serif italic text-cta-brass/90">
                  Experience is the product.
                </p>
              </div>
            </motion.div>

            {/* Refined CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="pt-16 flex flex-col items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 font-label uppercase tracking-[0.2em] text-sm border-2 border-cta-brass text-cta-brass px-10 py-4 rounded-md hover:bg-cta-brass hover:text-bg-primary transition-all duration-300"
              >
                <span>Build with us</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-xs uppercase tracking-widest text-text-base/40 font-label">
                Start your project
              </p>
            </motion.div>
          </div>
        </Container>
        {/* Scroll sentinel at bottom of hero */}
        <div id="hero-sentinel" className="absolute bottom-0 left-0 right-0 h-[1px]" />
      </div>
    </Section>
  );
}