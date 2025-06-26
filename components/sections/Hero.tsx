'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function Hero() {
  return (
    <Section id="hero" className="bg-bg-primary" removePadding="y">
      <div className="h-[calc(100vh-96px)] flex items-center">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-8"
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none text-text-base">
              The brand that builds brands.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="font-sans text-lg md:text-xl text-text-base/80"
            >
              We build brands from the inside out.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pt-8"
            >
              <Button href="#contact" variant="outline" size="lg">
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}