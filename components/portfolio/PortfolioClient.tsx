'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategoryFilter,
  type PortfolioProject,
} from '../../config/portfolio';
import PortfolioModal from './PortfolioModal';

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryFilter>('All');
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return portfolioProjects;
    return portfolioProjects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'font-label uppercase tracking-widest text-xs px-4 py-2 rounded-full border transition-colors',
              activeCategory === cat
                ? 'border-cta-brass text-cta-brass'
                : 'border-text-base/15 text-text-base/60 hover:text-text-base'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => {
              if (project.comingSoon) return;
              setSelected(project);
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
            aria-disabled={project.comingSoon ? true : undefined}
            className={clsx(
              'group text-left',
              project.comingSoon ? 'cursor-default' : 'cursor-pointer'
            )}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-text-base/10 bg-bg-primary">
              <Image
                src={project.thumbnailSrc}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={index < 2}
              />

              {project.comingSoon && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-bg-primary/30 bg-bg-primary/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-bg-primary font-label">
                    Coming soon
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute left-5 right-5 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-serif text-xl text-bg-primary truncate">
                      {project.title}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-bg-primary/80 font-label">
                      {project.categories.join(' · ')}
                    </div>
                    {project.comingSoon && (
                      <div className="mt-2 text-xs uppercase tracking-widest text-bg-primary/80 font-label">
                        Coming soon
                      </div>
                    )}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-bg-primary/70 font-label">
                    {project.year}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="font-serif text-lg text-text-base truncate">
                  {project.title}
                </div>
                <div className="eyebrow text-text-base/50">{project.year}</div>
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-text-base/40 font-label">
                {project.categories.join(' · ')}
              </div>
              {project.comingSoon && (
                <div className="mt-2 text-xs uppercase tracking-widest text-text-base/50 font-label">
                  Coming soon
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {selected && (
        <PortfolioModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
