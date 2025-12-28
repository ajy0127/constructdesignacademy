export type PortfolioCategory =
  | 'B2B Tax'
  | 'B2B Audit'
  | 'E-commerce'
  | 'B2C Services';

export interface CaseStudySection {
  title: string;
  description?: string;
  bullets?: string[];
}

export interface CaseStudy {
  role?: string;
  timeline?: string;
  tools?: string[];
  sections: CaseStudySection[];
}

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
  caseStudy?: CaseStudy;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'b2b-audit',
    title: 'B2B Audit',
    year: 2024,
    categories: ['B2B Audit'],
    thumbnailSrc: '/products/b2b-audit-thumb.jpg',
    description:
      'A structured audit workflow that reduces cognitive load by bringing status, evidence, and next steps into a single cohesive interface.',
    caseStudyBullets: [
      'Created a repeatable audit flow from intake to resolution.',
      'Standardized components for evidence, notes, and activity history.',
      'Designed clear states for progress, blockers, and approvals.',
    ],
    caseStudy: {
      role: 'UI Designer',
      timeline: '2024',
      tools: ['Figma', 'FigmaMake', 'Design systems', 'Prototyping', 'IA + workflow design'],
      sections: [
        {
          title: 'Problem',
          description:
            'Audit work often lives across spreadsheets, email, and disconnected evidence stores, making it hard to maintain a single source of truth and move issues to resolution quickly.',
        },
        {
          title: 'Constraints',
          bullets: [
            'Audit workflows require rigid traceability, history, and permissions.',
            'Users need high confidence in status and what is blocking progress.',
          ],
        },
        {
          title: 'Solution',
          bullets: [
            'Unified status, evidence, and next steps into a single interface with clear progress states.',
            'Created consistent patterns for evidence capture, notes, and activity timelines.',
            'Designed for repeatability so the same structure scales across audit types.',
          ],
        },
        {
          title: 'Outcomes',
          bullets: [
            'Reduced cognitive load during reviews by grouping information by decision priority.',
            'More consistent handoffs with standardized components and status definitions.',
          ],
        },
      ],
    },
    imageSrcs: [
      '/products/b2b-audit-01.jpg',
      '/products/b2b-audit-02.jpg',
      '/products/b2b-audit-03.jpg',
    ],
  },
  {
    id: 'b2b-tax',
    title: 'B2B Tax',
    year: 2025,
    categories: ['B2B Tax'],
    thumbnailSrc: '/products/b2b-tax-thumb.jpg',
    prototypeId: 'b2b-tax',
    description:
      'A B2B tax platform designed to eliminate execution bottlenecks during peak periods by transforming fragmented status signals and manual PBC fulfillment into role based visibility, AI assisted bulk workflows, and audit ready traceability.',
    caseStudy: {
      role: 'Lead Product Designer, UI/UX + AI workflow design',
      timeline: '2025',
      tools: ['Figma', 'FigmaMake', 'Design Systems', 'Prototyping', 'User Flows', 'AI Integration Design'],
      sections: [
        {
          title: 'Problem',
          description:
            'During peak tax periods, fragmented status and workload signals made it difficult to staff engagements, plan billable effort, and keep clients moving while PBC fulfillment stayed slow and manual.',
          bullets: [
            'Clients lacked clarity on what was outstanding and what to do next, driving repeated follow ups and delayed uploads.',
            'Tax teams lacked cross client visibility, making it harder to triage overdue work and intervene early.',
            'PBC fulfillment required users to upload and match files one by one, an approach that doesn\'t scale when processing 200+ files against hundreds of requests during compressed timelines.',
            'Leadership struggled to allocate resources proactively because workload signals were scattered across tools.',
          ],
        },
        {
          title: 'Users',
          description:
            'Internal users included tax Staff, Seniors, and Managers responsible for day to day execution: request follow up, document review, and deadline management. Directors and Partners needed portfolio level visibility across multiple clients to spot risk early and intervene.',
          bullets: [
            'External users: Client Finance and Accounting Leads needed confidence in progress, clear deadlines, and deliverables ready for review.',
            'Client Accounting team members handled most uploads and request completion.',
            'This is a high volume, deadline driven workflow where users depend on stable table first experiences, clear request status language, and strong compliance and security controls.',
          ],
        },
        {
          title: 'Constraints',
          bullets: [
            'Support large corporate clients with complex entity structures without compromising security.',
            'Avoid duplicating existing systems for tasking and scheduling while still surfacing operational signals teams need to act.',
            'UI must support role based simplicity, clear status taxonomy, and audit friendly traceability.',
            'Scale to large request lists and high file volume via search, filtering, bulk actions, and predictable navigation.',
          ],
        },
        {
          title: 'Process',
          description:
            'Research focused on mapping internal and client personas and identifying the highest frequency breakdowns: unclear next actions, lack of progress confidence, overdue request visibility, and frictionful PBC fulfillment during peak periods.',
          bullets: [
            'Flows and IA organized around a consistent "signal → drill down → action" ladder: Dashboard surfaces progress and urgency → Client view shows which request categories are behind → Request list built for volume with clear statuses → AI Bulk Upload for scale fulfillment.',
            'Design system work standardized table first patterns, stable navigation rails for rapid client switching, consistent status taxonomy (Complete, Fulfilled, Returned, Not Applicable), and urgency cues (past due, due soon, comment activity).',
            'Validation through iterative prototyping and walkthroughs focused on comprehension, trust, and safe error recovery.',
          ],
        },
        {
          title: 'AI Integration',
          description:
            'AI Bulk Upload addresses the biggest execution bottleneck: manual one by one matching of documents to requests. The system proposes the most relevant request match for each file, classifies and routes into request categories, and handles exceptions for unmatched files.',
          bullets: [
            'Designed a guided 3 step workflow: Upload Files → Review and Adjust AI Matches → Complete Upload.',
            'Transparent processing states with progress feedback and time expectations.',
            'Review interface prioritizes unmatched items, with reassignment controls for rapid correction and confidence scores to help users calibrate trust.',
            'Safeguards: Human in the loop review gate prior to completion, unmatched first handling to prevent misfiling, and post upload traceability linking each file to its request, category, status, and uploader.',
          ],
        },
        {
          title: 'Impact',
          description:
            'This work created a role based, table first visibility layer that made workload and urgency legible across engagements, enabling faster staffing decisions during peak periods and reducing avoidable delays.',
          bullets: [
            'Designed to support bulk processing of 200+ files in a single batch against hundreds of requests through AI assisted matching with human review.',
            'Demonstrated in prototype: completion summary showing 77% fulfilled or complete immediately after AI assisted bulk upload and review.',
            'Tax teams could quickly identify which engagements were falling behind using clear progress, outstanding volume, and urgency signals directly on the dashboard.',
            'Designed safeguards: unmatched first handling, confidence guided review, and post upload traceability linking file to request, status, and uploader for auditability.',
          ],
        },
        {
          title: 'Learnings',
          description:
            'High trust AI requires workflow design, not just model capability. In this domain, the best AI experience is predictable, reviewable, and auditable.',
          bullets: [
            'Next: Scale further into large, complex entity management with bulk entity operations, clearer entity hierarchies, and faster cross entity triage.',
            'Reduce AI review time further by grouping low confidence matches, enabling batch reassignment, and adding match transparency with "why matched" explanations.',
            'Long term: Make the dashboard year round valuable by adding analytics surfaces that answer CFO questions, proactive risk detection for stalled work, and richer reporting on cycle time and bottlenecks.',
          ],
        },
      ],
    },
    imageSrcs: [
      '/products/b2b-tax-01.jpg',
      '/products/b2b-tax-02.jpg',
      '/products/b2b-tax-03.jpg',
      '/products/b2b-tax-04.jpg',
    ],
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
];

// Simplified category groupings for filtering
export const portfolioCategories = ['All', 'B2B', 'B2C', 'E-commerce'] as const;

export type PortfolioCategoryFilter = (typeof portfolioCategories)[number];
