import React from 'react';
import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  removePadding?: 'y' | 't' | 'b';
  background?: 'light' | 'dark' | 'muted' | 'accent';
}

export default function Section({ 
  children, 
  padding = 'lg',
  className,
  id,
  removePadding,
  background
}: SectionProps) {

  const backgroundClasses = {
    light: 'bg-bg-base',
    dark: 'bg-bg-primary',
    muted: 'bg-bg-sub',
    accent: 'bg-accent-gold'
  } as const;

  const paddings = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  };

  const paddingClass = removePadding === 'y' ? '' : removePadding === 't' ? 'pb-24' : removePadding === 'b' ? 'pt-24' : paddings[padding];

  return (
    <section 
      id={id}
      className={clsx(
        background ? backgroundClasses[background] : '',
        'relative isolate',
        paddingClass,
        className
      )}
    >
      {children}
    </section>
  );
}