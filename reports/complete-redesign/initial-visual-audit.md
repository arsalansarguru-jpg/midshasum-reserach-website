# MidShaSum Research — Initial Visual Audit

**Branch:** `feat/spatial-engineered-rebuild` (`3731a9c`)  
**Inspected Preview:** `https://midshasum-research-preview.vercel.app/` (deployed at `6711eb7`)  
**Routes Inspected:** `/`, `/about`, `/research`, `/technology`, `/intelligence`, `/ira-dev`, `/contact`, `/privacy`, `/terms`, `/disclosures` at `1440×900` (desktop) and `390×844` (mobile).

---

## 1. Key Problems Identified

1. **Monotonous Dark Rhythm (`8965px` Homepage / `6109px` Ira Dev):**  
   Every section across all 10 routes uses dark obsidian/navy backgrounds (`#080808` / `#0c1017`). There is no tonal contrast (such as warm ivory `#F2F0E9` editorial bands) to create breathing room, reading comfort, or architectural pacing.
2. **Repetitive Card Grids:**  
   - `/about` uses 6 identical glass cards for Guiding Principles and 2 identical cards for Vision/Mission.  
   - `/research` and `/technology` both open with the exact same 2×2 `FeatureCard` grid, making them feel structurally interchangeable.  
   - `/ira-dev` uses 6 identical cards for Vision Priorities and 6 identical interactive tiles for Areas of Interest.
3. **Competing Navigation Chrome:**  
   Desktop currently has a `224px` fixed left vertical rail (`SiteHeader`) *and* a right-edge `SpatialNavRail` on `2xl+`, which narrows the effective horizontal canvas for editorial spreads and 3D framing.
4. **Generic Legal & Editorial Document Presentation:**  
   `/privacy`, `/terms`, and `/disclosures` use dark backgrounds instead of a crisp, high-contrast editorial document layout. `/intelligence` renders an empty-state box inside a generic card rather than an intentional analytical journal / library masthead.
5. **Excessive Vertical Scroll Height:**  
   Homepage (`8965px` desktop / `10804px` mobile) and `/ira-dev` (`6109px` desktop / `9964px` mobile) have excessive vertical padding (`py-24 md:py-32`, `min-h-[100svh]` repeated 5 times) that dilutes pacing.

---

## 2. Retain / Redesign / Simplify / Remove Decisions

| Component / Area | Decision | Rationale |
|---|---|---|
| `SpatialExperienceCanvas` & `MidShaSumResearchCore` | **Retain & Refine** | Strong asymmetrical obsidian/champagne-gold sculpture; refine pacing, lighting, and mobile framing; remove redundant `SpatialNavRail` clutter. |
| `ParallaxSlider` (ObsidianUI) & 8 `.webp` plates | **Retain** | High-craft interactive exhibition; integrate seamlessly into the new homepage narrative. |
| `SiteHeader` | **Redesign** | Replace the `224px` left sidebar with a restrained, architectural horizontal top bar (`72px`) with full-width breathing room, clear active indicator, and clean mobile drawer. |
| `SiteFooter` | **Refine** | Keep institutional links, legal links, and tagline; elevate typographic alignment and spacing. |
| `About`, `Research`, `Technology`, `Intelligence`, `Ira Dev`, `Contact`, `Legal` | **Redesign** | Give each route a distinct editorial or systems composition, introducing **Warm Ivory (`#F2F0E9`)** editorial bands alongside **Obsidian (`#080A0D`)** and **Deep Navy (`#0A1628`)** spatial bands. |
| `FeatureCard` repetitive grids | **Replace / Diversify** | Replace identical card grids with editorial numbered lists, architectural tables/diagrams, and asymmetric split layouts. |
| `api/contact`, `ContactForm`, SEO, CSP, legal disclosures | **Preserve** | Keep all security headers, Resend + Upstash validation, canonicals, sitemaps, and Ira Dev AI-spokesperson disclosures intact. |
