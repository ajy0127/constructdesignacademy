'use client';

import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';

const expertise = [
  {
    title: 'Luxury Watch Industry',
    description: 'Deep understanding of horological heritage, craftsmanship, and the discerning collector mindset.',
    experience: '15+ years working with Swiss manufacturers, authorized dealers, and luxury watch collectors.',
    projects: [
      'Westime flagship digital experience',
      'Patek Philippe authorized dealer platforms',
      'Rolex boutique digital integration',
      'AP Royal Oak collection microsites'
    ]
  },
  {
    title: 'Luxury Retail & E-commerce',
    description: 'Expertise in high-end retail environments where trust, authenticity, and exclusivity drive purchasing decisions.',
    experience: 'Built platforms handling $50M+ in luxury goods transactions annually.',
    projects: [
      'Multi-brand luxury marketplaces',
      'Private client portal systems',
      'Concierge booking platforms',
      'VIP customer experience tools'
    ]
  },
  {
    title: 'Design & User Experience',
    description: 'Bauhaus-influenced design philosophy meeting modern usability standards. Form serves function, always.',
    experience: 'Award-winning design systems for Fortune 500 brands and luxury startups.',
    projects: [
      'Design systems for premium brands',
      'Mobile-first luxury experiences',
      'Accessibility-compliant interfaces',
      'Performance-optimized user journeys'
    ]
  },
  {
    title: 'Technical Excellence',
    description: 'Modern web technologies with enterprise reliability. Built for scale, optimized for performance.',
    experience: 'Full-stack development with focus on headless CMS, API integrations, and cloud infrastructure.',
    projects: [
      'Next.js + Shopify Plus platforms',
      'Headless WordPress implementations',
      'AWS-native serverless applications',
      'Real-time inventory management systems'
    ]
  }
];

const values = [
  {
    title: 'Precision',
    description: 'Like Swiss watchmaking, every detail matters. We approach digital craftsmanship with the same meticulous attention to detail that defines luxury timepieces.'
  },
  {
    title: 'Heritage',
    description: 'We understand the weight of legacy brands and the responsibility of translating centuries of craftsmanship into digital experiences.'
  },
  {
    title: 'Discretion',
    description: 'Working with high-net-worth clients and exclusive brands requires confidentiality, professionalism, and white-glove service standards.'
  },
  {
    title: 'Innovation',
    description: 'Respecting tradition while embracing innovation. We help heritage brands evolve without compromising their core identity.'
  }
];

export default function WhyConstructPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <Section background="accent" padding="xl">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-headline text-5xl md:text-7xl tracking-tight">
              Why Construct?
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-ivory-mist/90 leading-relaxed">
              We don't just build websites. We craft digital experiences for brands that demand excellence. 
              Our deep expertise in luxury markets, combined with technical mastery, delivers results that resonate with discerning audiences.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Expertise Sections */}
      {expertise.map((area, index) => (
        <Section 
          key={area.title}
          background={index % 2 === 0 ? 'light' : 'dark'}
          padding="xl"
        >
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-start"
            >
              <div className="space-y-6">
                <h2 className="font-headline text-3xl md:text-4xl tracking-tight">
                  {area.title}
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                  {area.description}
                </p>
                <p className="text-base leading-relaxed opacity-75 font-medium">
                  {area.experience}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-headline text-xl tracking-wide text-imperial-yellow">
                  Recent Projects:
                </h3>
                <ul className="space-y-3">
                  {area.projects.map((project, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-imperial-yellow rounded-full mt-3 flex-shrink-0"></div>
                      <span className="leading-relaxed">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Container>
        </Section>
      ))}

      {/* Values Section */}
      <Section background="muted" padding="xl">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <h2 className="font-headline text-4xl md:text-5xl tracking-tight">
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="font-headline text-xl tracking-wide text-imperial-yellow">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ivory-mist/80">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="light" padding="xl">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-headline text-4xl md:text-5xl tracking-tight text-emerald-forest">
              Ready to work with specialists?
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-charcoal-black/80 leading-relaxed">
              When your brand demands excellence, work with a team that understands luxury markets, 
              respects heritage, and delivers modern solutions.
            </p>
            <Button 
              href="/#contact" 
              variant="primary" 
              size="lg"
              className="text-xl px-12 py-5"
            >
              Let's Discuss Your Project
            </Button>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}