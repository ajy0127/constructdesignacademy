'use client';

import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';

const processSteps = [
  {
    category: 'BRAND',
    title: 'Visual identity systems that speak without screaming',
    description: 'We craft visual languages that communicate luxury through restraint. Every logo, color palette, and typographic choice reinforces your brand\'s position in the premium market.',
    details: [
      'Brand strategy & positioning',
      'Logo & identity design',
      'Typography systems',
      'Color palette development',
      'Brand guidelines & applications'
    ]
  },
  {
    category: 'UX/UI',
    title: 'Digital experiences where form serves function',
    description: 'Our interfaces marry Bauhaus principles with modern usability. Clean, purposeful design that guides users effortlessly through your digital ecosystem.',
    details: [
      'User experience research',
      'Interface design systems',
      'Prototyping & user testing',
      'Responsive design frameworks',
      'Accessibility compliance'
    ]
  },
  {
    category: 'SPATIAL',
    title: 'Physical environments that embody brand values',
    description: 'From retail spaces to trade show installations, we create environments where your brand comes to life through architectural thinking and material excellence.',
    details: [
      'Retail space design',
      'Exhibition & trade show design',
      'Environmental graphics',
      'Material selection & sourcing',
      'Installation management'
    ]
  },
  {
    category: 'DIGITAL',
    title: 'Platforms built for connection and conversion',
    description: 'Performance-optimized websites and applications that don\'t compromise on aesthetics. Built on modern frameworks with enterprise-grade reliability.',
    details: [
      'Custom web development',
      'E-commerce platforms',
      'CMS integration',
      'Performance optimization',
      'Analytics & conversion tracking'
    ]
  }
];

export default function ProcessPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <Section background="muted" padding="xl">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-headline text-5xl md:text-7xl tracking-tight">
              Experience is the product.
            </h1>
            
            <div className="flex justify-center mb-12">
              <div className="w-20 h-20 bg-oxblood-red rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-ivory-mist rounded-full"></div>
              </div>
            </div>
            
            <p className="text-xl max-w-3xl mx-auto text-ivory-mist/90 leading-relaxed">
              Our four-discipline approach ensures every touchpoint reinforces your brand's luxury positioning. 
              From digital interfaces to physical spaces, we create cohesive experiences that resonate with discerning audiences.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Process Steps */}
      {processSteps.map((step, index) => (
        <Section 
          key={step.category}
          background={index % 2 === 0 ? 'light' : 'dark'}
          padding="xl"
        >
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <h2 className="font-headline text-2xl tracking-wider text-imperial-yellow">
                  {step.category}
                </h2>
                <h3 className="font-headline text-3xl md:text-4xl tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  {step.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-headline text-xl tracking-wide text-imperial-yellow">
                  What we deliver:
                </h4>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-imperial-yellow rounded-full mt-3 flex-shrink-0"></div>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Container>
        </Section>
      ))}

      {/* CTA Section */}
      <Section background="accent" padding="xl">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-headline text-4xl md:text-5xl tracking-tight">
              Let's build yours.
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-ivory-mist/90 leading-relaxed">
              Ready to create experiences that elevate your brand? 
              Let's discuss how our integrated approach can transform your business.
            </p>
            <Button 
              href="/#contact" 
              variant="accent" 
              size="lg"
              className="text-xl px-12 py-5"
            >
              Start a Project
            </Button>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}