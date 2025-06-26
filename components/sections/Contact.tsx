'use client';

import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../ui/Button';
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
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <Section id="contact" className="bg-bg-primary text-text-base">
      <Container className="max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Ready to construct a new project?
          </h2>
          <p className="font-sans text-lg text-text-base/80 mb-12">
            Tell us about your vision, and we’ll tell you how we can bring it to life.
          </p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 text-left"
        >
          <div>
            <label htmlFor="fullName" className="font-label uppercase tracking-widest text-sm">Full Name*</label>
            <input {...register("fullName", { required: true })} id="fullName" type="text" className="w-full bg-bg-sub border border-text-base/10 rounded-md p-3 mt-2" />
            {errors.fullName && <span className="text-error text-sm mt-1">Name can’t be empty</span>}
          </div>
          <div>
            <label htmlFor="email" className="font-label uppercase tracking-widest text-sm">Email*</label>
            <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} id="email" type="email" className="w-full bg-bg-sub border border-text-base/10 rounded-md p-3 mt-2" />
            {errors.email && <span className="text-error text-sm mt-1">Enter a valid email</span>}
          </div>
          <div>
            <label htmlFor="company" className="font-label uppercase tracking-widest text-sm">Company</label>
            <input {...register("company")} id="company" type="text" className="w-full bg-bg-sub border border-text-base/10 rounded-md p-3 mt-2" />
          </div>
          <div>
            <label htmlFor="budget" className="font-label uppercase tracking-widest text-sm">Budget</label>
            <select {...register("budget")} id="budget" className="w-full bg-bg-sub border border-text-base/10 rounded-md p-3 mt-2">
              <option value="">Select a budget</option>
              <option value="<25k">&lt; $25k</option>
              <option value="25-50k">$25k - $50k</option>
              <option value="50-100k">$50k - $100k</option>
              <option value=">100k">&gt; $100k</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="font-label uppercase tracking-widest text-sm">Message*</label>
            <textarea {...register("message", { required: true, maxLength: 600 })} id="message" rows={6} className="w-full bg-bg-sub border border-text-base/10 rounded-md p-3 mt-2"></textarea>
            {errors.message && <span className="text-error text-sm mt-1">Tell us a bit about the project</span>}
          </div>
          <div className="text-center pt-4">
            <Button type="submit" variant="primary" size="lg">
              Submit Inquiry
            </Button>
          </div>
        </motion.form>
      </Container>
    </Section>
  );
}