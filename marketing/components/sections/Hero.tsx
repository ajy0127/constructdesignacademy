'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function Hero() {
  return (
    <Section background="accent" padding="xl" className="min-h-screen flex items-center">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            We build brands<br />
            from the inside out.
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-headline text-xl md:text-2xl tracking-widest text-ivory-mist/90 uppercase"
          >
            Design. Product. Experience.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-imperial-yellow text-4xl"
          >
            ↓
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8"
          >
            <Button 
              href="#contact" 
              variant="accent" 
              size="lg"
              className="text-xl px-12 py-5"
            >
              Let&apos;s Build Together
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}