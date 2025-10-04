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
    subtitle: 'Crafting timeless brand identities.',
    icon: '⚙️',
    overlay: {
      title: 'Design Excellence',
      content: [
        'We blend timeless aesthetics with cutting edge technology to create brands that endure.',
        'Every element is intentional, from color theory to spatial relationships.',
        'Our design philosophy: elegance through restraint, impact through precision.'
      ]
    }
  },
  {
    id: 'branding',
    title: 'Branding',
    subtitle: 'Building brands that resonate.',
    icon: '🎨',
    overlay: {
      title: 'Brand Strategy',
      content: [
        'Cohesive brand experiences that create emotional connections across every touchpoint.',
        'Strategic positioning that differentiates you in crowded markets.',
        'Visual identity systems that scale from business cards to billboards with consistency.'
      ]
    }
  },
  {
    id: 'ux-ui',
    title: 'UX/UI',
    subtitle: 'Designing intuitive experiences.',
    icon: '📱',
    overlay: {
      title: 'User Experience Design',
      content: [
        'Research driven design that puts users first, always.',
        'Prototyping and testing that validates before we build.',
        'Interaction design that feels natural, motion that guides without distraction.',
        'Design systems that empower teams and ensure consistency at scale.'
      ]
    }
  },
  {
    id: 'development',
    title: 'Development',
    subtitle: 'Engineering elegant solutions.',
    icon: '⚙️',
    overlay: {
      title: 'Technical Excellence',
      content: [
        'Modern stack: Next.js, TypeScript, and cutting edge frameworks.',
        'Performance-obsessed: Every millisecond matters.',
        'Scalable architecture built for growth, not just launch.',
        'Cloud native deployment with zero downtime updates.'
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

        <p className="text-center text-lg md:text-xl text-text-base/70 font-light mb-12 max-w-2xl mx-auto">
          Precision crafted services that transform vision into reality
        </p>

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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
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