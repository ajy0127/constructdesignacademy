import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  background?: 'light' | 'dark' | 'accent' | 'muted';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

export default function Section({ 
  children, 
  background = 'light',
  padding = 'lg',
  className,
  id
}: SectionProps) {
  const backgrounds = {
    light: 'bg-ivory-mist text-charcoal-black',
    dark: 'bg-charcoal-black text-ivory-mist',
    accent: 'bg-emerald-forest text-ivory-mist',
    muted: 'bg-royal-blue text-ivory-mist',
  };

  const paddings = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  };

  return (
    <section 
      id={id}
      className={clsx(
        'relative isolate',
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      {children}
    </section>
  );
}