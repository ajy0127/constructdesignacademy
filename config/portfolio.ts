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
  prototypeId?: string;
  figmaEmbedUrl?: string;
  comingSoon?: boolean;
  description?: string;
  caseStudyBullets?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'b2b-tax',
    title: 'B2B Tax',
    year: 2025,
    categories: ['B2B Tax'],
    thumbnailSrc: '/products/b2b-tax-thumb.jpg',
    prototypeId: 'b2b-tax',
    description:
      'A B2B tax experience focused on clarity, speed, and confidence—streamlining complex flows into guided steps and actionable summaries.',
    caseStudyBullets: [
      'Simplified navigation across entities, periods, and filings.',
      'Designed scalable UI patterns for tables, review states, and alerts.',
      'Improved information hierarchy for faster decision-making.',
    ],
    imageSrcs: [
      '/products/b2b-tax-01.jpg',
      '/products/b2b-tax-02.jpg',
      '/products/b2b-tax-03.jpg',
      '/products/b2b-tax-04.jpg',
    ],
  },
  {
    id: 'b2b-audit',
    title: 'B2B Audit',
    year: 2025,
    categories: ['B2B Audit'],
    thumbnailSrc: '/products/b2b-audit-thumb.jpg',
    description:
      'A structured audit workflow that reduces cognitive load—bringing status, evidence, and next steps into a single cohesive interface.',
    caseStudyBullets: [
      'Created a repeatable audit flow from intake to resolution.',
      'Standardized components for evidence, notes, and activity history.',
      'Designed clear states for progress, blockers, and approvals.',
    ],
    imageSrcs: [
      '/products/b2b-audit-01.jpg',
      '/products/b2b-audit-02.jpg',
      '/products/b2b-audit-03.jpg',
    ],
  },
  {
    id: 'luxury-fashion-ecommerce',
    title: 'Luxury Fashion E-commerce',
    year: 2026,
    categories: ['E-commerce'],
    thumbnailSrc: '/products/ecommerce-brand-thumb.jpg',
    imageSrcs: [
      '/products/ecommerce-brand-thumb.jpg',
    ],
    comingSoon: true,
  },
  {
    id: 'acerlo-app',
    title: 'Acerlo',
    year: 2026,
    categories: ['B2C Services'],
    thumbnailSrc: '/products/acerlo-brand-thumb.jpg',
    imageSrcs: [
      '/products/acerlo-brand-thumb.jpg',
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
