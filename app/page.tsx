import Hero from '../components/sections/Hero';
import PracticeAreas from "../components/sections/PracticeAreas";
import Pillars from "../components/sections/Pillars";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <PracticeAreas />
      <Pillars />
      <Section className="bg-bg-primary py-12">
        <Container className="text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="font-serif text-xl md:text-2xl text-text-base/80 mb-6">
              Have a project in mind?
            </p>
            <Link
              href="/contact"
              className="font-label uppercase tracking-widest text-sm border border-cta-brass text-cta-brass px-6 py-3 rounded-md hover:bg-cta-brass hover:text-bg-primary transition-colors inline-block"
            >
              Build with us →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}