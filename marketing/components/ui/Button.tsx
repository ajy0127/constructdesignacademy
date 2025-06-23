import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  href, 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick,
  type = 'button'
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-headline tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-emerald-forest text-ivory-mist hover:bg-emerald-forest/90 focus-visible:outline-emerald-forest',
    secondary: 'border-2 border-emerald-forest text-emerald-forest hover:bg-emerald-forest hover:text-ivory-mist focus-visible:outline-emerald-forest',
    accent: 'border-2 border-imperial-yellow text-imperial-yellow hover:bg-imperial-yellow hover:text-emerald-forest focus-visible:outline-imperial-yellow',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}