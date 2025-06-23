'use client';

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Section from '../ui/Section';

const services = [
  {
    title: 'BRAND',
    description: 'Visual identity systems that speak without screaming',
  },
  {
    title: 'UX/UI', 
    description: 'Digital experiences where form serves function',
  },
  {
    title: 'SPATIAL',
    description: 'Physical environments that embody brand values',
  },
  {
    title: 'DIGITAL',
    description: 'Platforms built for connection and conversion',
  },
];

export default function Experience() {
  return (
    <Section background="muted" id="experience">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-16"
        >
          <div className="space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl tracking-tight">
              Experience is the product.
            </h2>
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-oxblood-red rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-ivory-mist rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="font-headline text-lg tracking-wider text-imperial-yellow">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ivory-mist/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <h3 className="font-headline text-3xl md:text-4xl tracking-tight">
              Let&apos;s build yours.
            </h3>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}