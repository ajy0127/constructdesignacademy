'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import type { PortfolioProject } from '../../config/portfolio';

type ModalView = 'gallery' | 'prototype';

function toFigmaEmbedUrl(inputUrl: string): string {
  const url = inputUrl.trim();
  if (!url) return '';

  if (url.startsWith('https://www.figma.com/embed')) {
    try {
      const parsed = new URL(url);
      const embedded = parsed.searchParams.get('url');
      if (!embedded) return '';
      return url;
    } catch {
      return '';
    }
  }

  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

export default function PortfolioModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState<ModalView>('gallery');

  const prototypeEmbedUrl = useMemo(() => {
    if (!project.figmaEmbedUrl) return '';
    return toFigmaEmbedUrl(project.figmaEmbedUrl);
  }, [project.figmaEmbedUrl]);

  const hasPrototype = Boolean(prototypeEmbedUrl) && !project.comingSoon;

  const safeActiveIndex = useMemo(() => {
    if (project.imageSrcs.length === 0) return 0;
    return Math.min(Math.max(activeIndex, 0), project.imageSrcs.length - 1);
  }, [activeIndex, project.imageSrcs.length]);

  useEffect(() => {
    setActiveIndex(0);
    setView('gallery');
  }, [project.id]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (view !== 'gallery') return;

      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => Math.min(i + 1, project.imageSrcs.length - 1));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, project.imageSrcs.length, view]);

  return (
    <AnimatePresence>
      <motion.div
        key={project.id}
        className="fixed inset-0 z-[200] flex items-center justify-center px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Close modal"
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-5xl bg-bg-primary border border-text-base/10 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="flex items-start justify-between gap-6 p-6 border-b border-text-base/10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h2 className="font-serif text-2xl text-text-base truncate">
                  {project.title}
                </h2>
                <span className="eyebrow text-text-base/50">{project.year}</span>
                {project.comingSoon && (
                  <span className="inline-flex items-center rounded-full border border-text-base/15 px-3 py-1 text-[10px] uppercase tracking-widest text-text-base/60 font-label">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full border border-text-base/15 px-3 py-1 text-xs uppercase tracking-widest text-text-base/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  className={clsx(
                    'font-label uppercase tracking-widest text-xs px-4 py-2 rounded-md border transition-colors',
                    view === 'gallery'
                      ? 'border-cta-brass text-cta-brass'
                      : 'border-text-base/15 text-text-base/60 hover:text-text-base'
                  )}
                >
                  Gallery
                </button>
                {hasPrototype && (
                  <button
                    type="button"
                    onClick={() => setView('prototype')}
                    className={clsx(
                      'font-label uppercase tracking-widest text-xs px-4 py-2 rounded-md border transition-colors',
                      view === 'prototype'
                        ? 'border-cta-brass text-cta-brass'
                        : 'border-text-base/15 text-text-base/60 hover:text-text-base'
                    )}
                  >
                    Prototype
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-text-base/60 hover:text-text-base transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="sm:hidden flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setView('gallery')}
                className={clsx(
                  'flex-1 font-label uppercase tracking-widest text-xs px-4 py-2 rounded-md border transition-colors',
                  view === 'gallery'
                    ? 'border-cta-brass text-cta-brass'
                    : 'border-text-base/15 text-text-base/60 hover:text-text-base'
                )}
              >
                Gallery
              </button>
              {hasPrototype && (
                <button
                  type="button"
                  onClick={() => setView('prototype')}
                  className={clsx(
                    'flex-1 font-label uppercase tracking-widest text-xs px-4 py-2 rounded-md border transition-colors',
                    view === 'prototype'
                      ? 'border-cta-brass text-cta-brass'
                      : 'border-text-base/15 text-text-base/60 hover:text-text-base'
                  )}
                >
                  Prototype
                </button>
              )}
            </div>

            {view === 'gallery' ? (
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-text-base/10 bg-bg-primary">
                  {project.imageSrcs.length > 0 ? (
                    <Image
                      src={project.imageSrcs[safeActiveIndex]}
                      alt={`${project.title} image ${safeActiveIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-base/50">
                      No images yet.
                    </div>
                  )}

                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
                      className="m-3 rounded-full border border-text-base/15 bg-bg-primary/70 backdrop-blur px-3 py-3 text-text-base/70 hover:text-text-base transition-colors disabled:opacity-30"
                      disabled={safeActiveIndex === 0}
                      aria-label="Previous"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((i) => Math.min(i + 1, project.imageSrcs.length - 1))
                      }
                      className="m-3 rounded-full border border-text-base/15 bg-bg-primary/70 backdrop-blur px-3 py-3 text-text-base/70 hover:text-text-base transition-colors disabled:opacity-30"
                      disabled={safeActiveIndex >= project.imageSrcs.length - 1}
                      aria-label="Next"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {project.imageSrcs.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                    {project.imageSrcs.map((src, idx) => (
                      <button
                        key={`${src}-${idx}`}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={clsx(
                          'relative h-16 w-16 flex-none rounded-lg overflow-hidden border transition-colors',
                          idx === safeActiveIndex
                            ? 'border-cta-brass'
                            : 'border-text-base/10 hover:border-text-base/30'
                        )}
                        aria-label={`Open image ${idx + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 text-center text-xs uppercase tracking-widest text-text-base/40 font-label">
                  Use arrow keys to navigate. Press Esc to close.
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-text-base/10 bg-bg-primary">
                {prototypeEmbedUrl && !project.comingSoon ? (
                  <iframe
                    title={`${project.title} prototype`}
                    src={prototypeEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-base/50">
                    {project.comingSoon ? 'Prototype coming soon.' : 'No prototype link set.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
