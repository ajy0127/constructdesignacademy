export type PortfolioCategory =
  | 'B2B Tax'
  | 'B2B Audit'
  | 'E-commerce'
  | 'B2C Services';

export interface PortfolioProject {
  id: string;
  title: string;
  year: number;
  categories: PortfolioCategory[];
  thumbnailSrc: string;
  imageSrcs: string[];
  figmaEmbedUrl?: string;
  comingSoon?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'b2b-tax',
    title: 'B2B Tax',
    year: 2025,
    categories: ['B2B Tax'],
    thumbnailSrc: '/portfolio/b2b-tax-thumb.jpg',
    imageSrcs: [
      '/portfolio/b2b-tax-01.jpg',
      '/portfolio/b2b-tax-02.jpg',
      '/portfolio/b2b-tax-03.jpg',
      '/portfolio/b2b-tax-04.jpg',
    ],
    figmaEmbedUrl:
      'https://www.figma.com/make/p9c2fmymgqloOfPSTGkBIM/Recreate-Design-Identically?fullscreen=1&t=0zW2UhJ25V082EwQ-1',
  },
  {
    id: 'b2b-audit',
    title: 'B2B Audit',
    year: 2025,
    categories: ['B2B Audit'],
    thumbnailSrc: '/portfolio/b2b-audit-thumb.jpg',
    imageSrcs: [
      '/portfolio/b2b-audit-01.jpg',
      '/portfolio/b2b-audit-02.jpg',
      '/portfolio/b2b-audit-03.jpg',
    ],
  },
  {
    id: 'luxury-fashion-ecommerce',
    title: 'Luxury Fashion E-commerce',
    year: 2026,
    categories: ['E-commerce'],
    thumbnailSrc: '/portfolio/ecommerce-brand-thumb.jpg',
    imageSrcs: [
      '/portfolio/ecommerce-brand-thumb.jpg',
    ],
    comingSoon: true,
  },
  {
    id: 'acerlo-app',
    title: 'Acerlo',
    year: 2026,
    categories: ['B2C Services'],
    thumbnailSrc: '/portfolio/acerlo-brand-thumb.jpg',
    imageSrcs: [
      '/portfolio/acerlo-brand-thumb.jpg',
    ],
    comingSoon: true,
  },
];

export const portfolioCategories = [
  'All',
  ...Array.from(
    new Set(portfolioProjects.flatMap((p) => p.categories))
  ),
] as const;

export type PortfolioCategoryFilter = (typeof portfolioCategories)[number];
