'use client';

import { motion } from 'framer-motion';
import RevealCard from '../ui/RevealCard';
import Container from '../ui/Container';
import Section from '../ui/Section';

const pillars = [
  {
    title: 'Discretion',
    description:
      'Confidentiality is assumed.\nWe operate behind the scene as white label partners, embedded teams, and NDA protected collaborators with secure pipelines. Our best work is often never seen, and that’s by design.',
    iconSrc: '/discreation.png',
  },
  {
    title: 'Heritage',
    description:
      'Translate legacy without losing weight.\nWe preserve the DNA that makes a brand iconic and evolve it with restraint, clarity, and respect. Every system we design honors what came before while making it legible to a modern audience.',
    iconSrc: '/images/practice/luxury.png', // Using an alternative image that we know exists
  },
  {
    title: 'Innovation',
    description:
      'Modernize with grace.\nWe anticipate cultural and technological shifts with discipline. Innovation here is timeless design engineered for tomorrow, ensuring brands remain relevant without losing their center.',
    iconSrc: '/images/practice/uxui.png', // Using an alternative image that we know exists
  },
  {
    title: 'Precision',
    description:
      'Every detail matters.\nFrom typography to transitions, our craftsmanship is invisible but always present. Across every pixel, breakpoint, and interaction, elegance feels effortless.',
    iconSrc: '/images/practice/tech.png', // Using an alternative image that we know exists
  },
];

export default function Pillars() {
  return (
    <Section className="bg-bg-primary py-24">
      <Container>
        {/* Heading with divider lines */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 border-t border-text-base/20" />
          <h2 className="heading-2">4 Pillars</h2>
          <div className="flex-1 border-t border-text-base/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <RevealCard
                title={pillar.title}
                description={pillar.description}
                iconSrc={pillar.iconSrc}
                minHeightClass="min-h-[340px]"
                className="text-center"
                headerNoWrap={pillar.title === 'Discretion'}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
