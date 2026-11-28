# MidShaSum Research — Vertical Glassmorphism Navigation & Design Direction Proposal

**Branch:** `feat/spatial-engineered-rebuild`  
**Status:** Design Proposal (Awaiting Approval — No Code Changes Applied)  

---

## 1. Evaluation Summary

### 1.1 Does a vertical navigation rail improve the spatial website experience?
**Yes, on desktop (`≥ 1024px` / `lg+`), with two structural adjustments:**
1. **Uninterrupted 100svh 3D Canvas:** Removing the `76px` sticky top header frees the full vertical viewport height (`100svh` instead of `calc(100svh - 76px)`), giving **THE MIDSHASUM RESEARCH CORE** and the five spatial environments stronger vertical monumentality.
2. **Unified Navigation:** Currently, desktop visitors have both a top horizontal bar (`SiteHeader`) and a floating right-edge `SpatialNavRail` (`2xl:flex`). Consolidating primary site navigation into a **left-edge architectural glass rail**—while keeping section progress subtle or integrated—eliminates competing chrome and frames the 3D viewport like a museum or spatial instrument interface.

### 1.2 Optimal Dimensions, Placement & Visual Hierarchy
- **Width:** `224px` fixed (`w-56`) on `lg`–`xl` (`1024px–1535px`), or `240px` (`w-60`) on `2xl+` (`≥ 1536px`). Narrow enough to preserve `1200px–1680px` of open spatial canvas on `1440px` and `1920px` screens, wide enough for crisp typography without wrapping.
- **Placement:** `fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col justify-between`.
- **Content Offset:** Main `<main>` and `<SiteFooter>` shift right via `lg:pl-[224px] 2xl:pl-[240px]`. Because `1440px - 224px = 1216px` and `container-shell` is `min(1180px, calc(100% - 48px))`, the `container-shell` still fits comfortably with `18px+` breathing room on each side (or `container-shell` can tighten to `min(1100px, calc(100% - 48px))` for generous editorial margins).
- **Hierarchy (Top → Bottom):**
  1. **Top:** MidShaSum Research monogram + `MIDSHASUM` / `RESEARCH` wordmark (links to `/`), separated by a `1px` `rgba(255,255,255,0.08)` hairline.
  2. **Middle:** Vertical stack with subtle index numerals (`01`–`05`):
     - `01 · About` (`/about`)
     - `02 · Research` (`/research`)
     - `03 · Technology` (`/technology`)
     - `04 · Intelligence` (`/intelligence`)
     - `05 · Ira Dev` (`/ira-dev`)
  3. **Bottom:** `Enquire` CTA (`/contact`) styled as a restrained champagne-gold glass/solid action button, anchored above a minimal tagline micro-label (`BEYOND THE KNOWN. BY DESIGN.`).
- **Active State:** A `2px` vertical champagne-gold (`#C9A227`) indicator bar on the left edge of the active link + `#E1C46B` text + subtle `rgba(201, 162, 39, 0.08)` translucent wash.

### 1.3 Impact on Existing 3D Spatial Environments
- Shifting `<main>` right by `224px–240px` means the 3D `<Canvas>` inside `.spatial-universe__sticky` and `PageHero` also shifts right (occupying `1216px` at `1440px`, `1680px` at `1920px`).
- **Required Camera Calibration:** Because the canvas aspect ratio narrows slightly (e.g., `1680×1080` instead of `1920×1080`), `desktopPos` X offsets in `spatial-canvas-redesign.tsx` (`2.15–2.38`) should be verified and slightly tuned (e.g., `1.95–2.15` or camera `z: 9.8`) so the right edge of **THE MIDSHASUM RESEARCH CORE** never clips at `1024px–1280px` laptops.
- **Vignette Continuity:** The left-edge rail's translucent obsidian surface (`rgba(8, 8, 8, 0.72)`) blends naturally into `.spatial-universe__vignette`, which already darkens the left side behind the hero typography.

---

## 2. Desktop & Mobile Navigation Concepts

### 2.1 Desktop Concept (`lg: 1024px+`)
```text
┌──────────────────┬──────────────────────────────────────────────────────┐
│ [MS] MIDSHASUM   │                                                      │
│      RESEARCH    │   CHAPTER 01 · INSTITUTIONAL CORE                    │
│ ──────────────── │                                                      │
│                  │   Beyond the                                         │
│ ▏01  About       │   Known.                      [3D MidShaSum Core]    │
│  02  Research    │   By Design.                                         │
│  03  Technology  │                                                      │
│  04  Intelligence│   An independent research...                         │
│  05  Ira Dev     │                                                      │
│                  │   [ENTER THE INSTITUTION]                            │
│ ──────────────── │                                                      │
│ [ ENQUIRE  ↗ ]   │                                                      │
│ BEYOND THE KNOWN │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘
```

### 2.2 Mobile & Tablet Concept (`< 1024px`: `360px`, `390px`, `768px`)
Do **not** force the left vertical rail onto small screens. Instead:
- **Top Compact Glass Bar (`h-16` / `64px`):** Fixed or sticky translucent obsidian bar (`rgba(8, 8, 8, 0.78)` + `backdrop-blur-md`) with the MidShaSum Research logo/wordmark on the left and a `44×44px` accessible menu trigger (`aria-expanded`, `aria-controls="mobile-glass-nav"`) on the right.
- **Slide-Out Vertical Glass Drawer:** Opens from the left (or full-height overlay) with `backdrop-blur-xl`, `rgba(8, 8, 8, 0.90)` backing for high WCAG contrast, `48px+` touch targets for `About`, `Research`, `Technology`, `Intelligence`, `Ira Dev`, and a full-width `Enquire` button at the bottom.
- **Keyboard & Accessibility:** Focus trap inside open drawer, `Escape` closes and returns focus to the trigger button, `prefers-reduced-motion` disables slide transitions.

---

## 3. Website-Wide Glassmorphism Design-Token Proposal

Add semantic glass tokens to `app/globals.css` (`:root`) so glass surfaces remain restrained, consistent, and never overly bright or neon:

```css
:root {
  /* Core Surfaces */
  --glass-bg: rgba(16, 18, 22, 0.62);          /* #101216 at 62% */
  --glass-bg-elevated: rgba(10, 22, 40, 0.54); /* #0A1628 midnight navy tint */
  --glass-bg-rail: rgba(8, 8, 8, 0.74);        /* #080808 obsidian rail */
  --glass-bg-fallback: rgba(12, 14, 18, 0.94); /* Solid-leaning fallback */

  /* Borders & Highlights */
  --glass-border: rgba(247, 247, 245, 0.09);
  --glass-border-hover: rgba(201, 162, 39, 0.34);
  --glass-border-active: rgba(225, 196, 107, 0.55);
  --glass-highlight-top: inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* Blur & Depth */
  --glass-blur-sm: blur(10px);
  --glass-blur-md: blur(16px);
  --glass-shadow: 0 18px 48px rgba(0, 0, 0, 0.42);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  :root {
    --glass-bg: var(--glass-bg-fallback);
    --glass-bg-elevated: var(--glass-bg-fallback);
    --glass-bg-rail: rgba(8, 8, 8, 0.96);
  }
}
```

---

## 4. Page-by-Page Recommended Glass Surfaces

| Page / Component | Apply Glassmorphism To | Keep Solid / High-Contrast (No Glass) |
|---|---|---|
| **Global Navigation** | Left desktop rail (`--glass-bg-rail`, `blur(16px)`), mobile top bar (`blur(10px)`), mobile slide-out drawer | Active text & focus rings (`#E1C46B` / `#F7F7F5` for > 7:1 contrast) |
| **Home (`/`)** | Chapter 02–05 subtle floating CTA/metadata pills, Research Frontiers domain selector pills & active dossier panel, Methodology active phase readout, Enquiry 3-column summary band | Hero `<h1>` / body copy (sits directly over dark vignette, no boxed card), Research Frontiers exhibition image plates |
| **About (`/about`)** | Guiding principles `01–06` subtle top-bordered cards (optional light `--glass-bg` only if over subtle backdrop; otherwise clean hairline) | Philosophy & Vision/Mission long-form prose |
| **Research (`/research`)** | 4 `FeatureCard` domain panels, Methodology active stage readout & stage selector buttons | "Method before conclusion" & "Future publications" reading columns |
| **Technology (`/technology`)** | 4 `FeatureCard` panels, 3-layer Conceptual Stack cards | "Engineering principle" prose |
| **Intelligence (`/intelligence`)** | Search input, category filter tabs, publication preview cards | Article body on `/intelligence/[slug]` (must remain solid `#080808` for reading comfort) |
| **Ira Dev (`/ira-dev`)** | Section jump bar (`Profile`, `Representation`, `Vision`, `Interests`, `Statement`), Vision priority cells | Biography prose & AI-representation disclosure text |
| **Contact (`/contact`)** | 3 enquiry category cards, `ContactForm` container (`--glass-bg` + `--glass-border`), dropdown/inputs | Form input text & validation alerts (solid dark input wells `#0a0b0d` for crisp contrast) |
| **Legal (`/privacy`, `/terms`, `/disclosures`)** | `LegalDraftNotice` banner only | All legal body copy (solid `#080808` background) |
| **Footer (`SiteFooter`)** | Clean `1px` top border + subtle `#060708` / `--glass-bg-rail` consistency | Legal & copyright links |

---

## 5. Before-and-After Visual Direction

- **Before (`reports/phase-4/screenshots/home-1920.png`, `home-1440.png`, `mobile-390.png`):**  
  - Desktop uses a `76px` solid/blurred top bar (`Home`, `About`, `Research`, `Technology`, `Intelligence`, `Ira Dev`, `CONTACT`) plus a separate right-edge `SpatialNavRail` on `2xl+`.
  - Cards (`FeatureCard`, Methodology readout, Contact form) use flat dark backgrounds (`#101216` / `#0a1018/85`) with `1px` `white/10` borders.
- **After (Proposed):**  
  - Desktop consolidates navigation into a single `224px` left architectural glass rail (`About`, `Research`, `Technology`, `Intelligence`, `Ira Dev`, bottom `Enquire`), freeing the top edge so the 3D scene spans `100svh`.
  - Interactive UI surfaces (domain cards, methodology readout, frontier dossier, intelligence filters, contact form) share unified translucent obsidian/navy glass tokens with subtle top-edge reflections and champagne-gold active borders.

---

## 6. Identified Technical Risks & Mitigations

1. **GPU Compositing Over Live WebGL (`backdrop-filter` + `frameloop="always"`):**
   - *Risk:* Applying `backdrop-filter: blur(16px)` over a continuously animating 60fps WebGL `<Canvas>` triggers extra GPU readback passes on mid-range laptops and mobile devices.
   - *Mitigation:* Restrict `backdrop-filter` to **fixed/bounded UI panels** (the left rail, mobile bar, and ≤ 2–4 visible cards at a time), cap blur at `10px–16px`, and disable `backdrop-filter` on small/low-power viewports or `prefers-reduced-transparency` / `prefers-reduced-motion` if frame rate drops.
2. **Sticky Scroll Offset (`top-[76px]`):**
   - *Risk:* `.spatial-universe__sticky` currently uses `top-[76px] h-[calc(100svh-76px)]`. On desktop with a left rail, there is no top bar—leaving `top-[76px]` would create a `76px` black gap at the top of the homepage.
   - *Mitigation:* Use `top-16 h-[calc(100svh-64px)] lg:top-0 lg:h-[100svh]` so mobile accounts for the `64px` top bar while desktop gets full-bleed `100svh`.
3. **3D Object Framing at `1024px–1280px`:**
   - *Risk:* Subtracting `224px` on `1024px` leaves `800px` width; `desktopPos` `x = 2.38` could push the sculpture's right wing near the viewport edge.
   - *Mitigation:* Scale/position the 3D group responsively based on viewport width (`1024–1360px` vs `1440px+`) and re-verify at `1024×768`, `1440×900`, and `1920×1080`.
4. **WCAG Contrast Over Gold 3D Highlights:**
   - *Risk:* Translucent cards over bright `#E1C46B` specular highlights on the 3D sculpture can drop text contrast below 4.5:1.
   - *Mitigation:* Keep `--glass-bg` opacity at `0.62–0.74` (obsidian/deep navy) and keep long-form reading sections on solid `#080808` / `#0b0d10` surfaces.
