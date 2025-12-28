import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import PortfolioClient from '../../components/portfolio/PortfolioClient';
import TestimonialCarousel from '../../components/testimonials/TestimonialCarousel';

export const metadata = {
  title: 'Products',
  description: 'Selected work and case studies by Construct.',
};

export default function ProductsPage() {
  return (
    <Section id="portfolio" className="bg-bg-primary py-24">
      <Container>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1 border-t border-text-base/20" />
          <h1 className="heading-2">Products</h1>
          <div className="flex-1 border-t border-text-base/20" />
        </div>

        <p className="text-center text-lg md:text-xl text-text-base/70 font-light mb-12 max-w-2xl mx-auto">
          A curated selection of work across brand, digital, and experience design.
        </p>

        <TestimonialCarousel />

        <PortfolioClient />
      </Container>
    </Section>
  );
}
