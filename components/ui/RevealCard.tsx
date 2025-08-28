'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';

type RevealCardProps = {
  title: string;
  description: string;
  iconSrc?: string;
  iconAlt?: string;
  iconNode?: ReactNode; // optional alternative to iconSrc (e.g., emoji or custom node)
  className?: string;
  minHeightClass?: string; // e.g., 'min-h-[280px]'
  headerNoWrap?: boolean; // if true, revealed header stays on one line
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

  // Detect if the device supports hover (desktop) to enable hover-to-reveal only there
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      const update = () => setIsHoverCapable(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    }
  }, []);

  const toggle = () => setSelected((s) => !s);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const active = selected || (isHoverCapable && hovered);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={toggle}
      onKeyDown={onKey}
      onMouseEnter={() => isHoverCapable && setHovered(true)}
      onMouseLeave={() => isHoverCapable && setHovered(false)}
      className={`border border-text-base/10 p-8 rounded-lg transition-colors duration-200 ease-out h-full ${minHeightClass} flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-brass hover:bg-cta-brass hover:border-cta-brass hover:text-black hover:[&_h3]:!text-black hover:[&_p]:!text-black/90 hover:[&_h3]:duration-0 hover:[&_p]:duration-0 ${selected ? 'bg-cta-brass border-cta-brass text-black' : 'text-text-base'} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!active ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-1 flex-col items-center justify-center w-full"
          >
            {(iconNode || iconSrc) && (
              <div className="w-[120px] h-[120px] p-2 mb-6 flex items-center justify-center">
                {iconNode ? (
                  <div className="text-7xl leading-none select-none">
                    {iconNode}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={iconSrc as string}
                      alt={iconAlt ?? title}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full border-0 ring-0 outline-none shadow-none bg-transparent"
                      onError={(e) => {
                        console.error(`Failed to load image: ${iconSrc}`);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {!iconSrc && (
                      <div className="absolute inset-0 flex items-center justify-center text-red-500">
                        Missing Icon
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <h3 className="font-serif text-xl mb-2">{title}</h3>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
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
  );
}
