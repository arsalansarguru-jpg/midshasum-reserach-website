# Stage 2 Project Audit

## Scope and baseline

The existing Git repository was audited before Stage 2 changes. It is a Next.js App Router application with TypeScript, React, Tailwind CSS 4 and shared page components. The project already had the ten primary/legal routes, generated sitemap/robots endpoints, source logo PDFs, optimized Ira Dev images and a contact form/API placeholder. Existing content avoids invented results and credentials.

The approved source assets remain unchanged in the parent project asset folders. The public logo files were inspected: `logo-black.png` and `logo-white.png` were byte-identical white-on-black source images, and the original derived monogram crop included part of the wordmark. Production contrast variants and a clean mark were rebuilt from the approved artwork.

## Architecture

- `app/`: App Router pages, metadata, sitemap, robots and contact route handler.
- `components/`: shared header, footer, page hero, section heading, feature card and contact form.
- `lib/`: reusable Intelligence article content model.
- `public/brand/`: production logo variants, original approved PDFs and generated browser/social assets.
- `public/ira-dev/`: optimized WebP avatar selections supplied with the project.

## Findings

1. **Typography** — Sora and Inter were named in CSS but not loaded; the browser could fall back to Arial.
2. **Brand assets** — the black and white variants were identical, the monogram crop included clipped wordmark text, and favicon/social artwork was missing.
3. **Contact workflow** — form API always returned 503; no provider delivery, request-size ceiling, category allowlist, production rate limit or origin check existed.
4. **Security headers** — no CSP, frame policy, content-type policy, referrer policy or permissions policy was configured.
5. **SEO** — several pages had no description/canonical, social images and X card metadata were missing, and draft legal pages could be indexed.
6. **Editorial structure** — Intelligence was a launch placeholder without a reusable publication record or article route.
7. **Legal readiness** — privacy and terms were brief placeholders; responsible entity, processing providers, jurisdiction and review status were unresolved.
8. **Responsive/accessibility** — mobile menu had no expanded/control state or active-page indication; visible keyboard focus and skip navigation were absent.
9. **Dependencies** — the baseline `npm audit` reported one high and one moderate PostCSS-related vulnerability through Next.js. The compatible patch path was to override PostCSS rather than change the framework major version.
10. **Deployment readiness** — contact credentials, email-domain verification, durable rate-limit service and legal facts were not available in the repository.

## Security review

The read-only security-review agent reported no confirmed exploitable vulnerability in the baseline application. The focused review did identify missing defensive controls and incomplete delivery behavior, which are implementation gaps rather than a reported exploit. Dependency audit findings are documented in `SECURITY_REVIEW.md`.

## Implementation plan

- Load optimized local Next.js fonts, refine responsive layout and keyboard navigation.
- Correct the logo variants and generate favicon, Apple touch and social-sharing artwork from approved assets.
- Add page-specific metadata, canonical/social metadata, crawl exclusions and a reusable article route.
- Integrate Resend and production Upstash sliding-window rate limiting; fail closed if production services are absent.
- Add secure response headers and bound/validate API requests.
- Make legal drafts explicit and non-indexable until qualified review and required facts are complete.
- Run lint, TypeScript, dependency audit, production build, route/API checks and browser viewport QA.
