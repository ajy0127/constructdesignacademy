'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';

interface Pillar {
  icon: JSX.Element;
  title: string;
  description: string;
  details: string[];
}

const pillars: Pillar[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cta-brass group-hover:fill-cta-brass transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-7.5 0C4.508 19.64 2.25 15.555 2.25 11.25c0-4.306 2.258-8.39 5.25-10.247a15.045 15.045 0 017.5 0c3.007 1.857 5.25 5.94 5.25 10.247 0 4.306-2.258 8.39-5.25 10.247z" />
      </svg>
    ),
    title: 'Innovation',
    description: 'Modernize with grace.',
    details: [
      'We blend timeless aesthetics with cutting-edge technology to future-proof brands.',
      'Continuous R&D keeps our clients at the forefront without chasing fads.',
      'Innovation is measured not by novelty, but by enduring relevance.'
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cta-brass group-hover:fill-cta-brass transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Discretion',
    description: 'Confidentiality is assumed.',
    details: [
      'White-label teams, signed NDAs, and secure delivery pipelines.',
      'We routinely work behind the scenes for household-name luxury groups.',
      'Your secrets remain yours; our best work is often unseen.'
    ],
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cta-brass group-hover:fill-cta-brass transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V18" />
      </svg>
    ),
    title: 'Heritage',
    description: 'Translate legacy without losing weight.',
    details: [
      'We respect the heritage of storied maisons while equipping them with modern digital capabilities.',
      'Legacy assets are audited, re-interpreted and integrated into cohesive systems.',
      'The result: evolutions that feel inevitable rather than revolutionary.'
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cta-brass group-hover:fill-cta-brass transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 0115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 0115 0m-15 0H3m18 0h-1.5" />
      </svg>
    ),
    title: 'Precision',
    description: 'Every detail matters.',
    details: [
      'Meticulous attention to typography, spacing and motion creates a perception of effortless quality.',
      'Pixel-perfect implementation audited across devices and breakpoints.',
      'We employ rigorous QA processes and automated visual regression testing.'
    ],
  },
];

export default function Pillars() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <Section id="pillars" className="bg-bg-sub text-text-base">
      <Container>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">
          Four Pillars
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              onClick={() => setOpen(open === index ? null : index)}
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 border border-text-base/10 rounded-lg text-center space-y-4 hover:bg-bg-primary transition-colors cursor-pointer min-h-[16rem] overflow-hidden"
            >
              <div className="flex justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-label text-xl uppercase tracking-widest text-cta-brass">
                {pillar.title}
              </h3>
              <p className="font-sans text-text-base/80">
                {pillar.description}
              </p>
              {open === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-bg-primary/95 p-6 flex flex-col justify-center text-left space-y-2 overflow-y-auto"
                >
                  {pillar.details.map((d) => (
                    <motion.p
                      key={d}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-text-base/70 leading-relaxed"
                    >
                      {d}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}