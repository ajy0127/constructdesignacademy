'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Image from 'next/image';

export default function Expertise() {
  return (
    <Section id="expertise" className="bg-bg-primary text-text-base">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-accent-gold mb-4">Luxury Retail</h2>
            <p className="font-sans text-lg text-text-base/80 mb-4">
              We craft digital flagships for the world’s most discerning brands. From bespoke e-commerce experiences to immersive product storytelling, we translate the art of luxury into the digital realm.
            </p>
            <p className="font-sans text-lg font-bold text-text-base">$50M+ transactions powered</p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/expertise/luxury-retail.png"
                alt="Digital luxury boutique with gold accents"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-16 items-center mt-16"
        >
          <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first">
              <Image
                src="/images/expertise/ux-ui.png"
                alt="UX and UI design imagery"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-accent-gold mb-4">UX / UI</h2>
            <ul className="font-sans text-lg text-text-base/80 list-disc list-inside">
              <li>User Research & Persona Development</li>
              <li>Wireframing & Prototyping</li>
              <li>Interaction & Motion Design</li>
              <li>Design Systems & Component Libraries</li>
            </ul>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-16 items-center mt-16"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-accent-gold mb-4">Technical Excellence</h2>
            <ul className="font-sans text-lg text-text-base/80 list-disc list-inside">
              <li>Next.js & TypeScript</li>
              <li>Tailwind CSS & Design Tokens</li>
              <li>Framer Motion & micro-interactions</li>
              <li>Cloud-native deployment on Vercel & AWS</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/expertise/technical-excellence.png"
              alt="Technical excellence code scene"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}