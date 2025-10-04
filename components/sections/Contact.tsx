'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import Container from '../ui/Container';
import Section from '../ui/Section';

type Inputs = {
  fullName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Formspree integration - Replace YOUR_FORM_ID with your actual Formspree form ID
      // Get your form ID from: https://formspree.io/
      const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID 
        ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
        : null;

      if (FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }
      } else {
        // Fallback: Log to console if no endpoint configured
        console.log('Form data (configure NEXT_PUBLIC_FORMSPREE_ID):', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="bg-bg-primary text-text-base min-h-screen flex items-center">
      <Container className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-32"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
                Let&apos;s construct something exceptional.
              </h2>
              <p className="text-lg text-text-base/70 leading-relaxed max-w-md">
                Share your vision with us. We&apos;ll respond promptly to discuss how we can bring it to life.
              </p>
              <div className="pt-4 space-y-3 text-text-base/60 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cta-brass rounded-full"></span>
                  Confidential consultation
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cta-brass rounded-full"></span>
                  No commitment required
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block font-serif text-text-base/80 mb-3">
                  Full Name*
                </label>
                <input 
                  {...register("fullName", { required: true })} 
                  id="fullName" 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-text-base/20 focus:border-cta-brass py-3 px-0 text-text-base placeholder:text-text-base/30 focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(194,163,118,0.2)]"
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="text-error text-xs mt-2 block">Required field</span>}
              </div>
              <div>
                <label htmlFor="email" className="block font-serif text-text-base/80 mb-3">
                  Email*
                </label>
                <input 
                  {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} 
                  id="email" 
                  type="email" 
                  className="w-full bg-transparent border-b-2 border-text-base/20 focus:border-cta-brass py-3 px-0 text-text-base placeholder:text-text-base/30 focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(194,163,118,0.2)]"
                  placeholder="john@company.com"
                />
                {errors.email && <span className="text-error text-xs mt-2 block">Valid email required</span>}
              </div>
            </div>

            {/* Company & Budget Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block eyebrow text-text-base/80 mb-3">
                  Company
                </label>
                <input 
                  {...register("company")} 
                  id="company" 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-text-base/20 focus:border-cta-brass py-3 px-0 text-text-base placeholder:text-text-base/30 focus:outline-none transition-all duration-300 focus:shadow-[0_2px_8px_rgba(194,163,118,0.2)]"
                  placeholder="Your Company"
                />
              </div>
              <div className="relative">
                <label htmlFor="budget" className="block eyebrow text-text-base/80 mb-3">
                  Project Budget
                </label>
                <select 
                  {...register("budget")} 
                  id="budget" 
                  className="w-full bg-transparent border-b-2 border-text-base/20 focus:border-cta-brass py-3 pr-8 px-0 text-text-base focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23C2A376' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="" className="bg-bg-primary text-text-base py-3">Select range</option>
                  <option value="<25k" className="bg-bg-primary text-text-base py-3">&lt; $25k</option>
                  <option value="25-50k" className="bg-bg-primary text-text-base py-3">$25k - $50k</option>
                  <option value="50-100k" className="bg-bg-primary text-text-base py-3">$50k - $100k</option>
                  <option value=">100k" className="bg-bg-primary text-text-base py-3">&gt; $100k</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block eyebrow text-text-base/80 mb-3">
                Tell us about your project*
              </label>
              <textarea 
                {...register("message", { required: true, maxLength: 600 })} 
                id="message" 
                rows={5} 
                className="w-full bg-transparent border-b-2 border-text-base/20 focus:border-cta-brass py-3 px-0 text-text-base placeholder:text-text-base/30 focus:outline-none transition-colors resize-none"
                placeholder="Share your vision, goals, and timeline..."
              />
              {errors.message && <span className="text-error text-xs mt-2 block">Please describe your project</span>}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto font-label uppercase tracking-widest text-sm border border-cta-brass text-cta-brass px-6 py-3 rounded-md hover:bg-cta-brass hover:text-bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Build with us →'}
              </button>
            </div>
          
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-accent-gold/20 border border-accent-gold rounded-md"
            >
              <p className="text-accent-gold font-medium">Thank you! We&apos;ll be in touch soon.</p>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-error/20 border border-error rounded-md"
            >
              <p className="text-error font-medium">Something went wrong. Please try again.</p>
            </motion.div>
          )}
        </motion.form>
        </div>
      </Container>
    </Section>
  );
}