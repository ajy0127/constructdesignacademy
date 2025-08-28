'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import RevealCard from '../../components/ui/RevealCard';
import Link from 'next/link';

const expertiseData = [
  {
    id: 'design',
    title: 'Design',
    subtitle: 'Crafting brand identities.',
    icon: '⚙️',
    overlay: {
      title: 'Design Excellence',
      content: [
        'We blend timeless aesthetics with cutting-edge technology to future-proof brands.',
        'Continuous R&D keeps our clients at the forefront without chasing fads.',
        'Innovation is measured not by novelty, but by enduring relevance.'
      ]
    }
  },
  {
    id: 'branding',
    title: 'Branding',
    subtitle: 'Building memorable brands.',
    icon: '🎨',
    overlay: {
      title: 'Brand Strategy',
      content: [
        'Creating cohesive brand experiences that resonate across all touchpoints.',
        'Strategic positioning that differentiates your brand in competitive markets.',
        'Visual identity systems that maintain consistency while allowing flexibility.'
      ]
    }
  },
  {
    id: 'ux-ui',
    title: 'UX/UI',
    subtitle: 'Shaping intuitive experiences.',
    icon: '📱',
    overlay: {
      title: 'User Experience Design',
      content: [
        'User Research & Persona Development',
        'Wireframing & Prototyping',
        'Interaction & Motion Design',
        'Design Systems & Component Libraries'
      ]
    }
  },
  {
    id: 'development',
    title: 'Development',
    subtitle: 'Implementing digital solutions.',
    icon: '⚙️',
    overlay: {
      title: 'Technical Excellence',
      content: [
        'Next.js & TypeScript',
        'Tailwind CSS & Design Tokens',
        'Framer Motion & micro-interactions',
        'Cloud-native deployment on Vercel & AWS'
      ]
    }
  }
];

// Map expertise ids to PNG icons placed in /public
const expertiseIcons: Record<string, string> = {
  'ux-ui': '/uxuiexpertise.png',
  design: '/Designexpertise.png',
  development: '/Devexpertise.png',
  branding: '/Branding.png',
};

export default function Expertise() {
  return (
    <Section id="expertise" className="bg-bg-primary py-24">
      <Container>
        {/* Heading with divider lines to match landing page sections */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1 border-t border-text-base/20" />
          <h2 className="heading-2">Our Expertise</h2>
          <div className="flex-1 border-t border-text-base/20" />
        </div>

        <p className="text-center body mb-10">Core services we offer</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {expertiseData.map((item, index) => {
            const description = [
              item.subtitle,
              '',
              ...item.overlay.content,
            ].join('\n');
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <RevealCard
                  title={item.title}
                  description={description}
                  iconSrc={expertiseIcons[item.id]}
                  minHeightClass="min-h-[340px]"
                  className="text-center"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA (button only) */}
        <div className="text-center mt-16">
          <Link href="/contact" className="cta-button">
            Build with us →
          </Link>
        </div>
      </Container>
    </Section>
  );
}