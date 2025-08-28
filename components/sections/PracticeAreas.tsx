'use client';

import { motion } from 'framer-motion';
import RevealCard from '../ui/RevealCard';
import Container from '../ui/Container';
import Section from '../ui/Section';

const practiceAreas = [
  {
    title: 'Luxury Retail & E-Commerce',
    description: 'We construct digital storefronts that sell luxury the way it\'s bought, with trust, taste, and quiet exclusivity.',
    iconSrc: '/images/practice/luxury.png',
  },
  {
    title: 'UX/UI Experience Design',
    description: 'Form follows feeling, powered by function.\nSystems are clean, usable, and intuitive.',
    iconSrc: '/images/practice/uxui.png',
  },
  {
    title: 'Technical Excellence',
    description: 'Headless. Secure. Scalable.\nWe build for longevity.',
    iconSrc: '/images/practice/tech.png',
  },
];

export default function PracticeAreas() {
  return (
    <Section className="bg-bg-primary py-24">
      <Container>
        {/* Heading with divider lines */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 border-t border-text-base/20" />
          <h2 className="font-serif text-2xl text-text-base">Practice Areas</h2>
          <div className="flex-1 border-t border-text-base/20" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <RevealCard
                title={area.title}
                description={area.description}
                iconSrc={area.iconSrc}
                minHeightClass="min-h-[340px]"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
