Below is a hyper-detailed PRD (≈10× the depth) for the Construct website.
Copy it straight into your repo (e.g., docs/PRD_construct.md) or hand it to any engineer / designer and they’ll know exactly what to build.

⸻

Construct Website – Full Product Requirements Document

Domain: https://constructdesignacademy.com
AWS CLI Profile: con Region: us-east-2
Last Updated: 25 Jun 2025

⸻

1. Executive Summary

Goal	Details
Purpose	Establish Construct as the luxury design studio that “builds brands” — showcasing thought-leadership, craft, and technical depth to win enterprise-level engagements.
MVP Deliverable	Single-scroll marketing site + working contact flow deployed on S3 + CloudFront.
Primary KPIs	(1) Qualified inquiry submissions / month, (2) Avg. scroll depth, (3) Engaged time ≥ 90 s.
Target Visitor	C-level execs, founders, and luxury brand managers evaluating design partners, plus press & talent.
Non-Goals	E-commerce, blog, client portal (slated for v2+).


⸻

2. Brand Canon

Item	Requirement
Voice	Confident, poetic, minimal. Every sentence must add value.
Tone	Luxury, architectural, global, slightly mysterious — never hype or startup-y.
Tagline	“The brand that builds brands.”
Colors	See §4.1 — strict usage rules protect luxury feel.
Typography	See §4.2 — fallback stacks + weight hierarchy.
Logo Variants	Wordmark / Monogram / Frame (gold-trace) — SVG only, no raster.


⸻

3. Information Architecture & Navigation

Nav Label	Anchor	Desktop Placement	Mobile Placement	Interaction
Home	#hero	Left in top bar	Hamburger menu	Smooth scroll
Expertise	#expertise	Center	“	“
Values	#pillars	Center	“	“
Contact	#contact (CTA)	Right, styled gold outline	Footer button & sticky bottom bar	Opens modal on mobile

Sticky nav appears after 64 px scroll (desktop) / 48 px (mobile).

⸻

4. Design System

4.1 Color Tokens

Token	Hex	WCAG Min Contrast	Usage Rules
--bg-primary	#111111	N/A	Section backgrounds
--bg-sub	#3D3D3D	N/A	Overlays, dividers, footers
--text-base	#F4F1EB	7.0:1 on primary	Body text
--accent-gold	#F7C843	4.5:1 on primary	Inline highlights only
--cta-brass	#D9AE5F	3.0:1 on primary	Buttons, links, hover states
--error	#BF3F3F	4.5:1	Form error text

Guardrail: Gold / brass NEVER used on large copy blocks; limit to 5 % of pixels on any viewport.

4.2 Typography

/* CSS font-face stack */
--font-serif: "Playfair Display", "Times New Roman", serif;
--font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
--font-label: "Space Grotesk", var(--font-sans);

Role	Font	Size (desktop / mobile)	Weight	Letter-Spacing
Hero	Serif	64 / 44	700	-1 %
Section H1	Serif	42 / 32	700	-0.5 %
Subtitle	Sans	20 / 18	500	0
Body	Sans	16 / 16	400	0.15 %
Label / Button	Label	14 / 14	500	2 % (all caps)


⸻

5. Content Flows & Block Specs

Block 1 — Hero / Header (id="hero")

Attribute	Spec
Height	100 vh minus 96 px nav
BG	--bg-primary, subtle 4 % noise texture
Copy	• Hero line (serif)• Subline (sans)• Scroll cue arrow with CSS animation
CTA Button	Outlined brass → fill on hover (300 ms)
Animations	Fade-in headline (400 ms delay), arrow bounce every 2 s
Responsive	On < 640 px center-align text; arrow hides; CTA fixed bottom 56 px.

Block 2 — Expertise (id="expertise")

Section	Layout	Content Hooks
Luxury Retail	2-col grid (image left, copy right)	“$50M+ transactions powered” stat, callout badge component
UX / UI	Inverted layout (image right)	Bullet list of deliverables w/ check icons
Technical Excellence	Full-width dark panel	Code snippet overlay (faux terminal) + tech stack list

Each sub-section uses an IntersectionObserver to slide-in (20 % viewport).

Block 3 — Four Pillars (id="pillars")

4-card grid (2×2 desktop, swipe carousel mobile).

Pillar	Micro-icon	Key Sentence
Innovation	Light-bulb line art	“Modernize with grace.”
Discretion	Keyhole	“Confidentiality is assumed.”
Heritage	Column	“Translate legacy without losing weight.”
Precision	Caliper	“Every detail matters.”

Dev Note: Icons are inline SVG, stroke 1.5 px, use --cta-brass fill on hover.

Block 4 — CTA / Contact Trigger (id="cta")

| Copy | “Ready to construct a new project?” |
| Layout | Centered, 640 px max-width, text aligned center |
| Button | primary style — brass fill, gold text, 8 px radius, shadow on hover |
| BG | Subtle angled split: top 40 % gunmetal, bottom 60 % primary |

Block 5 — Contact Form (id="contact")

Field	Type	Validation	Error Copy
Full Name*	text	Required	“Name can’t be empty”
Email*	email	Regex + MX check	“Enter a valid email”
Company	text	—	—
Budget	select • < 25k / 25-50k / 50-100k / > 100k	—	—
Message*	textarea (600 char max)	Required	“Tell us a bit about the project”

Submit → POST to AWS API Gateway → Lambda (sendContactEmail) → SES.
Server returns JSON {status: "ok"} or specific error codes.

Footer
	•	3-column CSS Grid (≥ 768 px) → single column (< 768 px).
	•	Social icons 24 px, gap 24 px.
	•	Legal line centered, 14 px, --text-base 60 % opacity.

⸻

6. Technical Architecture

Layer	Service	Config
Build	Vite + PostCSS	Tailwind 4, Autoprefixer
Hosting	S3 static site	Bucket: constructdesignacademy.com (private)
CDN	CloudFront	Origin access identity → S3
DNS	Route 53	A & AAAA alias → CF distro
Certificates	ACM (us-east-2)	constructdesignacademy.com, *.constructdesignacademy.com
CI/CD	GitHub Actions	main branch → build → aws s3 sync … --profile con → invalidation

Environment Variables (GitHub Secrets)

Name	Example	Used By
AWS_ACCESS_KEY_ID_CON	AKIA…	GH Actions deploy
AWS_SECRET_ACCESS_KEY_CON	…	“
SES_FROM_ADDRESS	noreply@constructdesignacademy.com	Lambda


⸻

7. Performance & Accessibility Budgets

Metric	Target
LCP	≤ 1.2 s on 4G, ≤ 500 ms on broadband
CLS	< 0.02
Total JS	≤ 150 kB gzipped
WCAG	2.2 AA (color contrast & keyboard nav)

Ship a Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO.

⸻

8. Analytics & Observability
	•	Plausible self-hosted (analytics.constructdesignacademy.com) → lightweight, cookieless.
	•	CloudFront access logs to S3 → Athena reports.
	•	Lambda logs → CloudWatch; alarms on ≥ 5 % error rate.

⸻

9. Security & Compliance
	•	S3 bucket encryption (SSE-S3).
	•	CloudFront “HTTPS-only” redirect.
	•	CSP: script-src 'self' plausible CDN, style-src 'self' ‘unsafe-inline’ (Tailwind JIT).
	•	Contact Lambda uses AWS WAF IP-reputation list.

⸻

10. Acceptance Criteria Checklist

#	Item	Owner	Status
1	All five blocks render pixel-perfect at 1440 × 900 and 375 × 812	FE	
2	Form validation works offline (Vanilla JS)	FE	
3	Form email lands in hello@construct.studio inbox < 5 s	BE	
4	Lighthouse metrics pass budgets	DevOps	
5	Deployed via con profile to us-east-2	DevOps	
6	404.html & 505.html exist	FE	
7	SEO meta title ≤ 60 chars, description ≤ 155 chars	Marketing	
8	All text review — no “lorem ipsum,” meets voice guidelines	Content	
9	Accessibility audit: keyboard, aria-labels, alt text	QA	
10	Security headers & CSP present	DevOps	


⸻

11. Milestones & Effort Estimates (t-shirt sizing)

Milestone	Scope	Size	ETA
M1 – Design System	Color, type, spacing tokens in Figma	M	2 days
M2 – Static Mark-up	HTML + Tailwind, no JS	L	4 days
M3 – Interactivity	Scroll animations + form validation	M	3 days
M4 – Lambda/SES	API GW, Lambda, SES sandbox release	M	2 days
M5 – CI/CD & Observability	GH Actions, CF logs, Plausible	S	1 day
M6 – QA & Hardening	Perf, a11y, security headers	M	2 days
Launch	DNS cutover + announce	S	½ day

Total Dev + Design effort: ≈14 person-days.

⸻

12. Next Steps
	1.	Approve PRD ➜ mark baseline frozen.
	2.	Spin repo with main, dev, design branches.
	3.	Wireframe hero and expertise sections (Figma).
	4.	Kickoff sprint per milestones.

