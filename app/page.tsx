import Hero from '../components/sections/Hero';
import PracticeAreas from "../components/sections/PracticeAreas";
import Pillars from "../components/sections/Pillars";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <PracticeAreas />
      <Pillars />
      <Section className="bg-bg-primary py-24 md:py-32">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Elegant top border */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cta-brass/30 to-transparent mb-16" />
            
            <div className="text-center space-y-8">
              {/* Refined heading */}
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-text-base leading-tight">
                Ready to build something
                <span className="block text-cta-brass italic mt-2">exceptional?</span>
              </h2>
              
              {/* Supporting text */}
              <p className="text-lg md:text-xl text-text-base/60 font-light max-w-2xl mx-auto leading-relaxed">
                Let&apos;s discuss your vision and craft a brand experience that resonates.
              </p>
              
              {/* Premium CTA */}
              <div className="pt-8 flex flex-col items-center gap-4">
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
                  Schedule a consultation
                </p>
              </div>
            </div>
            
            {/* Elegant bottom border */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cta-brass/30 to-transparent mt-16" />
          </div>
        </Container>
      </Section>
    </>
  );
}