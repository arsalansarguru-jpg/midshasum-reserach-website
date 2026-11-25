# Stage 2 Implementation Report

## Implemented

- Preserved the existing Next.js App Router architecture and existing primary routes.
- Loaded Sora and Inter through `next/font/google` for self-hosted optimized delivery.
- Refined the hero typography, CSS-only orbital motion, reduced-motion handling, focus visibility, skip link, active navigation and mobile-menu accessibility.
- Rebuilt transparent black/white logo exports and a clean gold monogram crop from the approved logo artwork. Added favicon, Apple icon and a 1200 x 630 social image carrying the exact official tagline.
- Added canonical, page-specific metadata, Open Graph and X card metadata, robots exclusions, and a typed article model/route for future Intelligence publications.
- Integrated Resend email delivery with server-side validation, bounded JSON body parsing, category allowlisting, same-origin checks, honeypot protection and no-store API responses.
- Added durable Upstash Redis sliding-window rate limiting (five requests per IP digest per 15 minutes). Production contact delivery fails closed unless all email and rate-limit configuration exists. Development uses a process-local limiter only.
- Added security response headers and expanded draft legal disclosures without asserting unverified legal or regulatory facts.
- Added setup, audit, legal, security, SEO and QA documentation.

## Dependency changes

Added `resend`, `@upstash/ratelimit` and `@upstash/redis`. Added a PostCSS override to a patched 8.5.x release, keeping the Next.js 15 architecture in place.

## External dependencies still required

- Resend API key and a verified sender domain/address.
- An approved destination inbox.
- Upstash Redis REST URL and token for durable production rate limiting.
- Confirmed legal entity, jurisdiction, privacy contact and data-processing details.
- Qualified review and approval of the legal drafts.
- Production domain verification, DNS and hosting authorization.

## Verification

Lint, TypeScript, dependency audit, production build, route checks, twelve contact API status assertions and responsive browser QA are recorded in `QA_TEST_REPORT.md`. The browser run covered ten routes at six viewport widths and generated twenty current screenshots under `reports/stage-2/`. Contact delivery remains disabled until the documented email and rate-limit services are configured; no message was sent during QA. No deployment or DNS changes are part of this work.
