'use client';

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Section from '../ui/Section';

export default function About() {
  return (
    <Section background="light" id="about">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-headline text-4xl md:text-5xl tracking-tight text-royal-blue">
                Construct is the atelier for modern brands.
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-charcoal-black/80">
                We craft digital and physical products that forge deep connections with consumers.
              </p>
              <p className="text-lg leading-relaxed text-charcoal-black/80">
                Where ideas are designed into experiences — through meticulous attention to detail, 
                architectural intelligence, and the belief that luxury is intentionality made visible.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}