# Construct Marketing Site

> Modern luxury design studio marketing site built with Next.js 15 + React 19 + Tailwind 4

## Architecture

- **Framework**: Next.js 15 (app router + Turbopack)
- **UI**: React 19 with framer-motion animations
- **Styling**: Tailwind CSS 4 with design tokens
- **Language**: TypeScript 5
- **Deployment**: AWS S3 + CloudFront via GitHub Actions

## Getting Started

### Development

```bash
cd marketing
npm install
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Production Build

```bash
npm run build
```

This generates a static export in `./out` ready for S3 deployment.

### Manual Deployment

```bash
npm run deploy
```

Uses AWS CLI with profile `con` to sync to S3 bucket `byconstruct.com`.

## CI/CD

The site auto-deploys via GitHub Actions when changes are pushed to `main`:

1. **Build & Test**: Lints code, builds Next.js, runs static export
2. **Deploy**: Syncs to S3, invalidates CloudFront cache  
3. **Lighthouse**: Performance audit with minimum 90% scores

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY` 
- `CLOUDFRONT_DISTRIBUTION_ID`

## Brand Colors

| Color | Hex | Usage |
|-------|-----|--------|
| Emerald Forest | `#014421` | Primary brand, hero backgrounds |
| Oxblood Red | `#4A0000` | Accent elements, CTAs |
| Imperial Yellow | `#F6C700` | Highlights, hover states |
| Royal Blue | `#002366` | Secondary sections |
| Ivory Mist | `#F6F5F0` | Light backgrounds, text on dark |
| Charcoal Black | `#121212` | Text, dark sections |

## Component Architecture

```
marketing/
├─ components/
│  ├─ ui/           # Reusable primitives (Button, Container, Section)
│  └─ sections/     # Marketing blocks (Hero, About, Experience)
├─ app/             # Next.js 15 app router
└─ styles/          # Global CSS + Tailwind config
```

**Rule**: `ui/*` components never import from `sections/*`; the reverse is allowed.

## Performance

- **Lighthouse**: ≥90 on all metrics (Performance, SEO, Best Practices, A11y)
- **Core Web Vitals**: Optimized with Next.js image optimization and static export
- **Caching**: Immutable assets (1 year), HTML files (no-cache)

## Deployment URLs

- **Production**: https://byconstruct.com
- **Staging**: Deploy previews on every PR via GitHub Actions

---

**Built with precision. Designed to be felt.**