import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import PortfolioClient from '../../components/portfolio/PortfolioClient';

export const metadata = {
  title: 'Portfolio',
  description: 'Selected work and case studies by Construct.',
};

export default function PortfolioPage() {
  return (
    <Section id="portfolio" className="bg-bg-primary py-24">
      <Container>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1 border-t border-text-base/20" />
          <h1 className="heading-2">Portfolio</h1>
          <div className="flex-1 border-t border-text-base/20" />
        </div>

        <p className="text-center text-lg md:text-xl text-text-base/70 font-light mb-12 max-w-2xl mx-auto">
          A curated selection of work across brand, digital, and experience design.
        </p>

        <PortfolioClient />
      </Container>
    </Section>
  );
}
