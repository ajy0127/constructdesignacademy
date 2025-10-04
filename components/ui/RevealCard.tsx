'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Close modal when navigating to a different page
  useEffect(() => {
    if (selected) {
      setSelected(false);
    }
  }, [pathname]);

  // Detect hover capability and mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');
      const mobileMq = window.matchMedia('(max-width: 768px)');
      
      const updateHover = () => {
        setIsHoverCapable(hoverMq.matches);
        // Reset hover state when capability changes
        setHovered(false);
      };
      
      const updateMobile = () => {
        setIsMobile(mobileMq.matches);
        // Reset all states when switching to/from mobile
        setHovered(false);
        setSelected(false);
      };
      
      updateHover();
      updateMobile();
      
      hoverMq.addEventListener?.('change', updateHover);
      mobileMq.addEventListener?.('change', updateMobile);
      
      return () => {
        hoverMq.removeEventListener?.('change', updateHover);
        mobileMq.removeEventListener?.('change', updateMobile);
      };
    }
  }, []);

  const toggle = () => {
    setSelected((s) => !s);
    // Reset hover state when toggling to prevent stuck states
    setHovered(false);
  };
  
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const handleMouseEnter = () => {
    // Only allow hover on desktop, not on mobile or touch devices
    if (isHoverCapable && !isMobile && !selected) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // Always reset hover state on mouse leave
    if (hovered) {
      setHovered(false);
    }
  };

  // On desktop: hover OR selected. On mobile: only selected
  // Prevent hover if already selected
  const active = selected || (!selected && isHoverCapable && hovered && !isMobile);

  const baseClasses = 'border p-8 rounded-lg h-full flex flex-col items-center text-center will-change-transform';
  const focusClasses = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-brass';
  const hoverClasses = 'md:hover:bg-cta-brass md:hover:border-cta-brass md:hover:text-black transition-colors duration-150 ease-out';
  // Don't show brass state on mobile when modal is open
  const activeClasses = (selected && !isMobile) ? 'bg-cta-brass border-cta-brass text-black' : 'border-text-base/10 text-text-base';

  return (
    <>
      {/* Mobile Elite Modal */}
      <AnimatePresence mode="wait">
        {isMobile && selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-bg-primary"
          >
            {/* Scrollable Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full overflow-y-auto pt-24 pb-32 px-6"
            >
            <div className="max-w-md mx-auto text-center">
              
              {/* Icon - BRIGHT and VISIBLE */}
              {(iconNode || iconSrc) && (
                <div className="mb-8">
                  {iconNode ? (
                    <div className="text-8xl leading-none select-none opacity-80">
                      {iconNode}
                    </div>
                  ) : (
                    <Image
                      src={iconSrc as string}
                      alt={iconAlt ?? title}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="object-contain mx-auto opacity-80 brightness-150"
                    />
                  )}
                </div>
              )}

              {/* Brass divider */}
              <div className="w-16 h-px bg-cta-brass mb-8 mx-auto" />

              {/* Title */}
              <h3 className={`font-serif text-3xl text-text-base mb-6 leading-tight ${headerNoWrap ? 'whitespace-nowrap' : ''}`}>
                {description.split('\n')[0]}
              </h3>

              {/* Description */}
              <div className="space-y-4">
                {description.split('\n').slice(1).map((line, i) => (
                  line.trim() && (
                    <p key={i} className="text-base text-text-base/90 leading-relaxed">
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>
            </motion.div>

            {/* Close Button - Subtle at Bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed bottom-8 left-0 right-0 flex justify-center z-[10000] pointer-events-none"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(false);
                }}
                className="pointer-events-auto px-6 py-2 bg-text-base/10 backdrop-blur-sm text-text-base/60 hover:text-text-base hover:bg-text-base/20 font-label uppercase tracking-widest text-xs rounded-full transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`${title} - Click to reveal more information`}
        onClick={toggle}
        onKeyDown={onKey}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseClasses} ${focusClasses} ${hoverClasses} ${activeClasses} ${minHeightClass} ${className}`}
      >
      <AnimatePresence mode="wait" initial={false}>
        {/* On mobile, always show front. On desktop, show front or back based on active state */}
        {!active || isMobile ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex flex-1 flex-col items-center justify-center w-full"
          >
            {(iconNode || iconSrc) && (
              <div className="w-[120px] h-[120px] p-2 mb-6 flex items-center justify-center">
                {iconNode ? (
                  <div className="text-7xl leading-none select-none">
                    {iconNode}
                  </div>
                ) : (
                  <Image
                    src={iconSrc as string}
                    alt={iconAlt ?? title}
                    width={120}
                    height={120}
                    loading="lazy"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
            )}
            <h3 className="font-serif text-xl mb-2">{title}</h3>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex flex-1 items-center justify-center w-full"
          >
            {(() => {
              const [firstLine, ...restLines] = description.split('\n');
              const body = restLines.join('\n').trim();
              return (
                <div className="text-center max-w-[36ch] mx-auto">
                  <h3 className={`font-serif text-base md:text-lg text-black mb-3 ${headerNoWrap ? 'whitespace-nowrap' : ''}`}>
                    {firstLine}
                  </h3>
                  {body && (
                    <p className="body-sm whitespace-pre-line text-black/90">
                      {body}
                    </p>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
