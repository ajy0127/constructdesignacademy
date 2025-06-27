'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';

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

export default function Expertise() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Section id="expertise" className="bg-bg-primary text-text-base min-h-screen flex items-center">
      <Container>
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-5xl md:text-6xl text-text-base mb-4"
          >
            Our Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-lg text-text-base/80"
          >
            The core services we offer.
          </motion.p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {expertiseData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 p-8 md:p-12 rounded-2xl border border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300 backdrop-blur-sm h-full flex flex-col items-center text-center">
                  <div className="text-4xl md:text-5xl mb-4 opacity-80">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-accent-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-text-base/70">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {hoveredCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-bg-primary/95 backdrop-blur-lg border border-accent-gold/30 rounded-2xl p-8 md:p-12 max-w-lg mx-auto shadow-2xl">
                <h4 className="font-serif text-2xl md:text-3xl text-accent-gold mb-6">
                  {expertiseData.find(item => item.id === hoveredCard)?.overlay.title}
                </h4>
                <div className="space-y-4">
                  {expertiseData.find(item => item.id === hoveredCard)?.overlay.content.map((text, idx) => (
                    <p key={idx} className="font-sans text-base text-text-base/80 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}