'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { ReactNode } from 'react';

type RevealCardProps = {
  title: string;
  description: string;
  iconSrc?: string;
  iconAlt?: string;
  iconNode?: ReactNode;
  className?: string;
  minHeightClass?: string;
  headerNoWrap?: boolean;
};

export default function RevealCard({
  title,
  description,
  iconSrc,
  iconAlt,
  iconNode,
  className = '',
  minHeightClass = 'min-h-[280px]',
  headerNoWrap = false,
}: RevealCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isMobile, isOpen]);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const [firstLine, ...restLines] = description.split('\n');
  const bodyText = restLines.join('\n').trim();

  return (
    <>
      {/* Mobile Modal */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-[9999] bg-bg-primary flex items-center justify-center p-6" onClick={handleClose}>
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-bg-primary rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-cta-brass hover:text-cta-brass/70 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            {(iconNode || iconSrc) && (
              <div className="mb-6 flex justify-center">
                {iconNode ? (
                  <div className="text-7xl opacity-70">{iconNode}</div>
                ) : (
                  <Image src={iconSrc!} alt={iconAlt ?? title} width={100} height={100} className="opacity-70" />
                )}
              </div>
            )}

            {/* Divider */}
            <div className="w-12 h-px bg-cta-brass/40 mb-6 mx-auto" />

            {/* Title */}
            <h3 className="font-serif text-2xl text-text-base mb-4 text-center">{firstLine}</h3>

            {/* Description */}
            {bodyText && (
              <div className="space-y-3 text-center">
                {restLines.map((line, i) => line.trim() && (
                  <p key={i} className="text-sm text-text-base/80">{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card */}
      <div
        onClick={handleClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`border p-8 rounded-lg h-full flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
          isHovered && !isMobile ? 'bg-cta-brass border-cta-brass text-black' : 'border-text-base/10 text-text-base hover:border-text-base/20'
        } ${minHeightClass} ${className}`}
      >
        {/* Icon */}
        {(iconNode || iconSrc) && (
          <div className="w-[120px] h-[120px] mb-6 flex items-center justify-center">
            {iconNode ? (
              <div className="text-6xl">{iconNode}</div>
            ) : (
              <Image src={iconSrc!} alt={iconAlt ?? title} width={120} height={120} className="object-contain" />
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-xl">{title}</h3>

        {/* Desktop Hover Content */}
        {isHovered && !isMobile && (
          <div className="mt-4 text-sm">
            <p className="font-serif mb-2">{firstLine}</p>
            {bodyText && <p className="text-xs opacity-90 line-clamp-3">{bodyText}</p>}
          </div>
        )}
      </div>
    </>
  );
}
