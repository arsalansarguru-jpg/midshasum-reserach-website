# MidShaSum Research Website

A standalone Next.js App Router project for the MidShaSum Research institutional website.

**Official tagline:** Beyond the Known. By Design.

## Stack
- Next.js 15 / React 19 / TypeScript
- Tailwind CSS 4
- Next.js-optimised Sora and Inter fonts
- Lazy React Three Fiber / Three.js scenes with a static CSS fallback and reduced-motion support
- Lucide icons
- Vercel-ready deployment configuration
- Resend delivery adapter and Upstash Redis rate limiting for the enquiry API

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production build
```bash
npm run build
npm run start
```

## Deploy to GitHub and Vercel
1. Create a new GitHub repository named `midshasum-research-website`.
2. Extract this project and open a terminal in the project directory.
3. Run:
   ```bash
   git init
   git add .
   git commit -m "Initial MidShaSum Research website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/midshasum-research-website.git
   git push -u origin main
   ```
4. In Vercel, import the GitHub repository.
5. Keep the framework preset as Next.js. Configure the variables documented in `ENVIRONMENT_SETUP.md` and `CONTACT_INTEGRATION_GUIDE.md` before enabling contact delivery.
6. Deploy, then add `midshasumresearch.com` in Vercel project Settings → Domains.
7. Apply the DNS records Vercel provides at your domain registrar.

## Asset delivery
- Original logo and tagline source files are retained in the source asset directories.
- Approved web copies and optimised Ira Dev images are organised under `public/brand/` and `public/ira-dev/`.
- See `ASSET_INVENTORY.md` for the complete production inventory.

## Spatial experience
- The homepage and page introductions use a lightweight orbital scene with pointer and scroll parallax.
- Three.js is code-split and mounted only when a scene approaches the viewport; mobile uses a reduced particle count and lower rendering resolution.
- The scene is decorative and never required to access content. A CSS architectural backdrop remains available when WebGL is unavailable, when loading fails, or when reduced motion is enabled.
- The existing Content Security Policy is preserved; the spatial experience does not require opening additional script, image or connection origins.

## Before public launch
- Confirm the exact registered legal entity name, address and jurisdiction.
- Have Privacy, Terms and Disclosures reviewed and completed by qualified counsel.
- Configure the contact API with Resend credentials, verified sender/recipient addresses and Upstash Redis REST credentials; it fails closed if production services are missing.
- Add verified institutional details, approved research publications and real project examples only.
- Add an approved Ira Dev video/presentation asset only after the final presentation format is supplied.
- Verify domain ownership, DNS, HTTPS, redirects and canonical domain in Vercel.
- Run `npm run build` and review accessibility, mobile layout and SEO before launch.

## Content integrity
This starter intentionally avoids fabricated performance figures, client logos, regulatory claims, awards, institutional affiliations and research credentials.
