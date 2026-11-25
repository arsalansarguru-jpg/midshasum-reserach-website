# Stage 2 QA Test Report

## Results

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npm audit` — passed with zero reported vulnerabilities.
- `npm run build` — passed.
- Production route checks — all ten primary and legal routes, plus sitemap, robots, favicon, Apple icon and Open Graph image returned HTTP 200.
- Browser QA — passed on `/`, `/about`, `/research`, `/technology`, `/intelligence`, `/ira-dev`, `/contact`, `/privacy`, `/terms` and `/disclosures`.
- Responsive widths — no horizontal overflow at 1920, 1440, 1024, 768, 390 or 360 CSS pixels on any tested route.
- Images — no broken images on any tested route, including Ira Dev portrait/gallery assets.
- Mobile navigation — menu opened and closed with Escape; no uncaught page errors.
- Contact API — twelve status assertions passed: missing content type (415), cross-origin request (403), invalid email (400), honeypot (400), oversized field and body (400), five valid but unconfigured requests (503), and the sixth valid request (429 with `Retry-After`).
- Visual inspection — regenerated desktop/mobile homepage, Ira Dev, contact and privacy captures; logos and portrait assets render as expected, the contact form correctly communicates its disabled state, and legal pages visibly identify themselves as drafts.

## Screenshots

The repeatable browser run saved 20 current screenshots in `reports/stage-2/`: desktop and mobile captures for each of the ten tested routes. The filenames use each route name followed by `-desktop.jpg` or `-mobile.jpg` (the homepage uses `home-`).

## Limitations

- Contact delivery was not tested against a live Resend account. No credentials were available; correctly configured valid requests returned 503 rather than reporting false success.
- The production Upstash-backed rate limiter was not exercised against a live Redis service. The 429 behavior was verified using the development in-process limiter.
- Provider rejection/exception behavior is implemented but was not tested against the external provider.
- This is browser layout and functional QA, not a full screen-reader, cross-browser, or formal accessibility audit.
