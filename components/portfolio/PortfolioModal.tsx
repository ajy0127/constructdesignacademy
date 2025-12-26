'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import type { PortfolioProject } from '../../config/portfolio';
import PrototypeRenderer from './prototypes/PrototypeRenderer';

type ModalView = 'gallery' | 'prototype' | 'caseStudy';

type FullscreenView = 'gallery' | 'prototype';

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
  initialView,
}: {
  project: PortfolioProject;
  onClose: () => void;
  initialView?: ModalView;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState<ModalView>('gallery');
  const [mediaAspect, setMediaAspect] = useState<number>(16 / 9);
  const [fullscreenView, setFullscreenView] = useState<FullscreenView | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const prototypeEmbedUrl = useMemo(() => {
    if (!project.figmaEmbedUrl) return '';
    return toFigmaEmbedUrl(project.figmaEmbedUrl);
  }, [project.figmaEmbedUrl]);

  const hasPrototype =
    (Boolean(project.prototypeId?.trim()) || Boolean(prototypeEmbedUrl)) && !project.comingSoon;

  const hasCaseStudy = Boolean(project.caseStudy) || Boolean(project.description) || Boolean(project.caseStudyBullets?.length);

  const safeActiveIndex = useMemo(() => {
    if (project.imageSrcs.length === 0) return 0;
    return Math.min(Math.max(activeIndex, 0), project.imageSrcs.length - 1);
  }, [activeIndex, project.imageSrcs.length]);

  useEffect(() => {
    setActiveIndex(0);
    setMediaAspect(16 / 9);
    const requestedView = initialView ?? 'gallery';
    if (requestedView === 'prototype' && !hasPrototype) {
      setView('gallery');
    } else if (requestedView === 'caseStudy' && !hasCaseStudy) {
      setView('gallery');
    } else {
      setView(requestedView);
    }
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    });
  }, [hasCaseStudy, hasPrototype, initialView, project.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenView) {
          setFullscreenView(null);
          return;
        }
        onClose();
      }
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
  }, [fullscreenView, onClose, project.imageSrcs.length, view]);

  const isFullscreen = fullscreenView !== null;

  const fullscreenOverlay =
    mounted && isFullscreen
      ? createPortal(
          <div className="fixed inset-0 bg-black" style={{ zIndex: 2147483647 }}>
            <button
              type="button"
              aria-label="Exit full screen"
              className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/50 backdrop-blur px-3 py-3 text-white/80 hover:text-white transition-colors"
              onClick={() => setFullscreenView(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="absolute inset-0 pt-14 pb-4 px-4">
              {fullscreenView === 'gallery' ? (
                <div className="relative h-full w-full">
                  {project.imageSrcs.length > 0 ? (
                    <Image
                      src={project.imageSrcs[safeActiveIndex]}
                      alt={`${project.title} image ${safeActiveIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/60">
                      No images yet.
                    </div>
                  )}

                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
                      className="m-3 rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 text-white/80 hover:text-white transition-colors disabled:opacity-30"
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
                      onClick={() => setActiveIndex((i) => Math.min(i + 1, project.imageSrcs.length - 1))}
                      className="m-3 rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 text-white/80 hover:text-white transition-colors disabled:opacity-30"
                      disabled={safeActiveIndex >= project.imageSrcs.length - 1}
                      aria-label="Next"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full bg-bg-primary overflow-auto">
                  {!project.comingSoon && project.prototypeId ? (
                    <PrototypeRenderer prototypeId={project.prototypeId} />
                  ) : prototypeEmbedUrl && !project.comingSoon ? (
                    <iframe
                      title={`${project.title} prototype`}
                      src={prototypeEmbedUrl}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-base/50">
                      {project.comingSoon ? 'Prototype coming soon.' : 'No prototype available.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  const content = (
    <AnimatePresence>
      <motion.div
        key={project.id}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-6 lg:px-8 py-8"
        style={{ zIndex: 2147483647 }}
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
          className="relative w-full max-w-5xl max-h-[calc(100vh-4rem)] bg-bg-primary border border-text-base/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-0"
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="flex items-start justify-between gap-4 p-4 border-b border-text-base/10">
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
            </div>

            <div className="flex items-center gap-3">
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

          <div
            ref={scrollRef}
            className="px-6 pt-4 pb-6 overflow-y-auto flex-1 min-h-0 overscroll-contain"
          >

            <div className="mb-6 flex items-center gap-3">
              {hasCaseStudy && (
                <button
                  type="button"
                  onClick={() => setView('caseStudy')}
                  className={clsx(
                    'cta-button flex-1 text-center',
                    view === 'caseStudy'
                      ? 'bg-cta-brass text-bg-primary'
                      : 'border-text-base/15 text-text-base/60 hover:border-cta-brass'
                  )}
                  aria-pressed={view === 'caseStudy'}
                >
                  Case Study
                </button>
              )}

              {hasPrototype && (
                <button
                  type="button"
                  onClick={() => setView('prototype')}
                  className={clsx(
                    'cta-button flex-1 text-center',
                    view === 'prototype'
                      ? 'bg-cta-brass text-bg-primary'
                      : 'border-text-base/15 text-text-base/60 hover:border-cta-brass'
                  )}
                  aria-pressed={view === 'prototype'}
                >
                  Prototype
                </button>
              )}

              <button
                type="button"
                onClick={() => setView('gallery')}
                className={clsx(
                  'cta-button flex-1 text-center',
                  view === 'gallery'
                    ? 'bg-cta-brass text-bg-primary'
                    : 'border-text-base/15 text-text-base/60 hover:border-cta-brass'
                )}
                aria-pressed={view === 'gallery'}
              >
                Gallery
              </button>
            </div>

            {view !== 'caseStudy' &&
              (project.description || (project.caseStudyBullets && project.caseStudyBullets.length > 0)) && (
              <div className="mb-4">
                {project.description && (
                  <p className="text-sm text-text-base/70 leading-relaxed">
                    {project.description}
                  </p>
                )}

                {project.caseStudyBullets && project.caseStudyBullets.length > 0 && (
                  <ul className="mt-3 space-y-2 pl-5 list-disc text-sm text-text-base/70">
                    {project.caseStudyBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {view === 'caseStudy' ? (
              <div className="space-y-8">
                {(project.description || (project.caseStudyBullets && project.caseStudyBullets.length > 0)) && (
                  <div className="rounded-2xl border border-text-base/10 bg-bg-primary/60 backdrop-blur p-6">
                    {project.description && (
                      <div className="text-base text-text-base/80 leading-relaxed">
                        {project.description}
                      </div>
                    )}
                    {project.caseStudyBullets && project.caseStudyBullets.length > 0 && (
                      <ul className="mt-4 space-y-2 pl-5 list-disc text-sm text-text-base/70">
                        {project.caseStudyBullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {project.caseStudy ? (
                  <div className="grid gap-6">
                    {(project.caseStudy.role || project.caseStudy.timeline || (project.caseStudy.tools && project.caseStudy.tools.length > 0)) && (
                      <div className="rounded-2xl border border-text-base/10 bg-bg-primary p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-text-base/40 font-label">Role</div>
                            <div className="mt-2 text-sm text-text-base/80">{project.caseStudy.role ?? '—'}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-text-base/40 font-label">Timeline</div>
                            <div className="mt-2 text-sm text-text-base/80">{project.caseStudy.timeline ?? '—'}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-text-base/40 font-label">Tools</div>
                            <div className="mt-2 text-sm text-text-base/80">
                              {project.caseStudy.tools && project.caseStudy.tools.length > 0
                                ? project.caseStudy.tools.join(', ')
                                : '—'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.caseStudy.sections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-2xl border border-text-base/10 bg-bg-primary p-6"
                      >
                        <div className="flex items-baseline justify-between gap-6">
                          <div className="font-serif text-xl text-text-base">{section.title}</div>
                        </div>

                        {section.description && (
                          <div className="mt-3 text-sm text-text-base/70 leading-relaxed">
                            {section.description}
                          </div>
                        )}

                        {section.bullets && section.bullets.length > 0 && (
                          <ul className="mt-4 space-y-2 pl-5 list-disc text-sm text-text-base/70">
                            {section.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-text-base/10 bg-bg-primary p-6 text-text-base/60">
                    Case study coming soon.
                  </div>
                )}
              </div>
            ) : view === 'gallery' ? (
              <div>
                <div
                  className="relative w-full rounded-xl overflow-hidden border border-text-base/10 bg-bg-primary"
                  style={{ aspectRatio: mediaAspect }}
                >
                  {project.imageSrcs.length > 0 && (
                    <div className="absolute top-3 right-3 z-10 lg:hidden">
                      <button
                        type="button"
                        onClick={() => setFullscreenView('gallery')}
                        className="rounded-full border border-text-base/15 bg-bg-primary/70 backdrop-blur px-3 py-3 text-text-base/70 hover:text-text-base transition-colors"
                        aria-label="View full screen"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {project.imageSrcs.length > 0 ? (
                    <Image
                      src={project.imageSrcs[safeActiveIndex]}
                      alt={`${project.title} image ${safeActiveIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-contain"
                      onLoadingComplete={(img) => {
                        const w = img.naturalWidth;
                        const h = img.naturalHeight;
                        if (!w || !h) return;
                        const next = w / h;
                        setMediaAspect((prev) => (Math.abs(prev - next) < 0.01 ? prev : next));
                      }}
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
                  <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
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

                <div className="mt-3 text-center text-xs uppercase tracking-widest text-text-base/40 font-label">
                  Use arrow keys to navigate. Press Esc to close.
                </div>
              </div>
            ) : (
              <div className="relative w-full h-[70vh] lg:h-auto lg:aspect-[16/9] rounded-xl overflow-auto border border-text-base/10 bg-bg-primary">
                {hasPrototype && (
                  <div className="absolute top-3 right-3 z-10 lg:hidden">
                    <button
                      type="button"
                      onClick={() => setFullscreenView('prototype')}
                      className="rounded-full border border-text-base/15 bg-bg-primary/70 backdrop-blur px-3 py-3 text-text-base/70 hover:text-text-base transition-colors"
                      aria-label="View full screen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {!project.comingSoon && project.prototypeId ? (
                  <PrototypeRenderer prototypeId={project.prototypeId} />
                ) : prototypeEmbedUrl && !project.comingSoon ? (
                  <iframe
                    title={`${project.title} prototype`}
                    src={prototypeEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-base/50">
                    {project.comingSoon ? 'Prototype coming soon.' : 'No prototype available.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(
    <>
      {content}
      {fullscreenOverlay}
    </>,
    document.body
  );
}
