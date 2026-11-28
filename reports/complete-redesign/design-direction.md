# MidShaSum Research — Complete Redesign Art Direction

**Brand:** MidShaSum Research  
**Tagline:** Beyond the Known. By Design.  
**Branch:** `feat/spatial-engineered-rebuild`

---

## 1. Visual & Material Palette

| Token | Hex | Role |
|---|---|---|
| **Obsidian** | `#080A0D` | Primary dark architectural ground |
| **Deep Institutional Navy** | `#0A1628` | Spatial depth & secondary dark surfaces |
| **Graphite** | `#171B21` | Subtle dark dividers, structural panels |
| **Warm Ivory** | `#F2F0E9` | Editorial reading sections, legal documents, high-contrast pacing |
| **Champagne Gold** | `#C9A227` | Restrained accents: active nav, index numerals, key rules |
| **Muted Steel** | `#858B95` | Secondary metadata & muted labels |

### Surface Discipline
- **Alternating Tonal Rhythm:** Dark Obsidian/Navy spatial & hero zones alternate with **Warm Ivory (`#F2F0E9`)** editorial reading zones (with `#080A0D` ink and `#525864` secondary ink).
- **Selective Glassmorphism:** Reserved strictly for floating navigation/overlays and selected interactive controls—never applied to every content block.

---

## 2. Navigation & Footer

- **Desktop Navigation (`lg+`):** Clean, architectural horizontal top bar (`h-[72px]`, translucent obsidian `rgba(8, 10, 13, 0.82)` with `backdrop-blur-md` and `1px` hairline border). MidShaSum Research monogram/wordmark on left; `About`, `Research`, `Technology`, `Intelligence`, `Ira Dev` centered/right with restrained gold underline on active route; `Enquire` CTA on far right. Frees full viewport width (`1440px` / `1920px`) for asymmetric editorial spreads and 3D sculpture.
- **Mobile Navigation (`< lg`):** Compact `64px` top bar with `44×44px` menu trigger opening a full-height vertical drawer with `48px+` touch targets.
- **Footer:** Monumental dark `#060709` closing band with wordmark, tagline, 3-column directory, and legal/copyright row.

---

## 3. Page-by-Page Art Direction

1. **Homepage (`/`):**
   - **Hero:** Full-bleed `100svh` Obsidian opening with `MidShaSumResearchCore` 3D sculpture on the right and refined Sora Light typography (`Beyond the Known. By Design.`) on the left.
   - **01 · Institutional Introduction (Warm Ivory `#F2F0E9`):** Asymmetric 2-column editorial spread introducing who we are, what we investigate, and why we exist—creating immediate visual contrast after the dark 3D hero.
   - **02 · Research Frontiers (Obsidian `#080A0D`):** ObsidianUI `ParallaxSlider` exhibition with the 8 original `.webp` frontier plates and concise active domain dossier.
   - **03 · Research Methodology (Warm Ivory `#F2F0E9`):** Interactive 6-stage sequence (`Research Question → Data → Method → Validation → Interpretation → Publication`) styled as a Swiss/editorial index + SVG orbital diagram on Warm Ivory.
   - **04 · Technology & Systems + Insights (Deep Navy `#0A1628` → Obsidian `#080A0D`):** Architectural 3-layer stack overview + Intelligence journal preview + Closing Institutional Outlook with enquiry CTA.
2. **About (`/about`):**
   - Dark spatial hero → **Warm Ivory** institutional philosophy & Vision/Mission two-column spread → **Obsidian** 6 Guiding Principles arranged as an architectural numbered ledger (hairline rows, not 6 identical cards).
3. **Research (`/research`):**
   - Dark spatial hero → **Warm Ivory** 4-discipline analytical table/spread (Quantitative Methods, Market Structure, Data Research, Model Evaluation) + interactive 6-stage Methodology → **Obsidian** Method Before Conclusion & Future Publications.
4. **Technology (`/technology`):**
   - Dark spatial hero → **Obsidian / Graphite** precision engineering blueprint: interactive/visual 3-layer **System Architecture Diagram** (`01 Data & Ingestion`, `02 Computational & Simulation Engine`, `03 Verification & Observability`) + structured engineering specifications (distinct from Research).
5. **Intelligence (`/intelligence`):**
   - Dark spatial hero → **Warm Ivory** journal-style publication library with search, category tabs, and a deliberate, publication-grade empty state explaining the editorial review standard (zero fabricated articles).
6. **Ira Dev (`/ira-dev`):**
   - Editorial portrait split hero + **Warm Ivory** biography & representation ledger + **Obsidian** Vision & Philosophy + **Warm Ivory** Areas of Interest index + clear AI-generated virtual spokesperson disclosure.
7. **Contact (`/contact`):**
   - Dark spatial hero → **Warm Ivory** 2-column enquiry layout (left: 3 editorial enquiry scopes; right: crisp, accessible `ContactForm` preserving Resend/Upstash validation).
8. **Legal (`/privacy`, `/terms`, `/disclosures`):**
   - Dark compact hero → **Warm Ivory** wide-margin editorial legal document (`max-w-3xl`) with prominent `DRAFT — NOT FOR PUBLICATION` notice banner.
