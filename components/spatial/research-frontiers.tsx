"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, X } from "lucide-react";
import { ParallaxSlider, type ParallaxSlide } from "@/components/block/parallax-slider";

export interface ResearchFrontierDomain {
  id: string;
  code: string;
  title: string;
  image: string;
  alt: string;
  summary: string;
  inquiryFocus: string[];
  href: string;
}

export const RESEARCH_FRONTIER_DOMAINS: ResearchFrontierDomain[] = [
  {
    id: "artificial-intelligence",
    code: "01",
    title: "Artificial Intelligence",
    image: "/frontiers/artificial-intelligence.webp",
    alt: "Abstract neural architecture in dark obsidian glass and champagne gold",
    summary: "Investigating foundational model behaviour, reasoning architectures, interpretability, and reliability under real-world uncertainty.",
    inquiryFocus: ["Model interpretability", "Reasoning & calibration", "Failure-mode analysis"],
    href: "/research"
  },
  {
    id: "computational-intelligence",
    code: "02",
    title: "Computational Intelligence",
    image: "/frontiers/computational-intelligence.webp",
    alt: "Mathematical manifold and algorithmic lattice in anodized titanium and gold",
    summary: "Exploring optimisation, evolutionary algorithms, and adaptive mathematical frameworks for high-dimensional problem spaces.",
    inquiryFocus: ["Non-convex optimisation", "Adaptive heuristics", "Information geometry"],
    href: "/research"
  },
  {
    id: "advanced-engineering",
    code: "03",
    title: "Advanced Engineering",
    image: "/frontiers/advanced-engineering.webp",
    alt: "Precision-machined scientific instrument cross-section in black titanium and gold",
    summary: "Studying resilient system architectures, deterministic software infrastructure, and precision computational tooling.",
    inquiryFocus: ["Fault-tolerant systems", "Deterministic pipelines", "Verification tooling"],
    href: "/technology"
  },
  {
    id: "quantum-computing",
    code: "04",
    title: "Quantum Computing",
    image: "/frontiers/quantum-computing.webp",
    alt: "Minimalist cryogenic quantum processor geometry in obsidian and brushed gold",
    summary: "Examining theoretical quantum algorithms, error mitigation paradigms, and hybrid classical-quantum computational models.",
    inquiryFocus: ["Hybrid algorithms", "Noise & error analysis", "Simulation bounds"],
    href: "/research"
  },
  {
    id: "autonomous-systems",
    code: "05",
    title: "Autonomous Systems",
    image: "/frontiers/autonomous-systems.webp",
    alt: "Precision kinematic gimbal and sensor array sculpture in matte carbon and gold",
    summary: "Analysing closed-loop decision systems, state estimation, and bounded autonomy in dynamic environments.",
    inquiryFocus: ["State estimation", "Control stability", "Safety envelopes"],
    href: "/technology"
  },
  {
    id: "scientific-computing",
    code: "06",
    title: "Scientific Computing",
    image: "/frontiers/scientific-computing.webp",
    alt: "High-density computational wave simulation surface with gold contour isolines",
    summary: "Developing numerical methods, reproducible simulation environments, and high-precision computational experiments.",
    inquiryFocus: ["Numerical stability", "Reproducible runs", "Sensitivity sweeps"],
    href: "/research"
  },
  {
    id: "emerging-technologies",
    code: "07",
    title: "Emerging Technologies",
    image: "/frontiers/emerging-technologies.webp",
    alt: "Experimental photonic crystal lattice in smoked obsidian glass and champagne gold",
    summary: "Evaluating nascent technological paradigms, hardware-software co-design, and long-horizon institutional implications.",
    inquiryFocus: ["Technology horizon", "First-principles review", "Structural readiness"],
    href: "/technology"
  },
  {
    id: "complex-systems",
    code: "08",
    title: "Complex Systems",
    image: "/frontiers/complex-systems.webp",
    alt: "Non-linear dynamical attractor and phase-space trajectories in gold wireframe",
    summary: "Mapping emergent behaviour, network contagion, market microstructure, and regime transitions across coupled systems.",
    inquiryFocus: ["Regime detection", "Network dynamics", "Tail-risk structure"],
    href: "/research"
  }
];

export function ResearchFrontiers() {
  const [selected, setSelected] = useState<ResearchFrontierDomain>(RESEARCH_FRONTIER_DOMAINS[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const slides: ParallaxSlide[] = RESEARCH_FRONTIER_DOMAINS.map((domain) => ({
    title: `${domain.code} — ${domain.title}`,
    image: domain.image,
    alt: domain.alt,
    href: `#frontier-${domain.id}`,
    focus: "50% 50%"
  }));

  return (
    <section
      id="section-frontiers"
      data-spatial-section="frontiers"
      className="relative isolate border-y border-white/10 bg-[#050608] py-20 md:py-28"
    >
      <div className="container-shell mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Compass className="text-[#c9a227]" size={15} aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[.26em] text-[#e1c46b]">
            03 / Research Frontiers · Proposed Exploration Domains
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
          Drag · Scroll · Arrow Keys to Explore
        </p>
      </div>

      {/* ObsidianUI Parallax Slider */}
      <div
        className="relative"
        style={
          {
            "--obsidian-parallax-foreground": "#f5f5f5",
            "--obsidian-parallax-background": "transparent",
            "--obsidian-parallax-slide-width": "clamp(230px, 24vw, 330px)",
            "--obsidian-parallax-slide-height": "clamp(340px, 42vh, 460px)",
            "--obsidian-parallax-gap": "24px",
            "--obsidian-parallax-radius": "2px",
            "--obsidian-parallax-fade": "clamp(2rem, 6vw, 7rem)"
          } as React.CSSProperties
        }
        onClick={(e) => {
          const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a.obsidian-parallax-slider__link");
          if (!anchor) return;
          const hash = anchor.getAttribute("href");
          if (hash?.startsWith("#frontier-")) {
            e.preventDefault();
            const id = hash.replace("#frontier-", "");
            const found = RESEARCH_FRONTIER_DOMAINS.find((d) => d.id === id);
            if (found) {
              setSelected(found);
              setDrawerOpen(true);
            }
          }
        }}
      >
        <ParallaxSlider
          slides={slides}
          orientation="portrait"
          eyebrow="Exhibition · Proposed Domains"
          title={
            <span className="font-display text-3xl font-light tracking-[-.04em] text-white sm:text-5xl lg:text-6xl">
              Frontiers of <span className="text-[#d8b84f]">Inquiry.</span>
            </span>
          }
          description="Proposed visual categories of inquiry. Not claims of established active programmes."
          parallax={0.22}
          zoom={1.12}
          scrollOnWheel={false}
          label="MidShaSum Research Frontiers"
        />
      </div>

      {/* Domain Selector & Active Dossier Bar */}
      <div className="container-shell mt-8">
        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {RESEARCH_FRONTIER_DOMAINS.map((domain) => {
            const active = selected.id === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => {
                  setSelected(domain);
                  setDrawerOpen(true);
                }}
                className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[.16em] transition-colors ${
                  active
                    ? "border-[#c9a227] bg-[#c9a227]/12 text-[#e1c46b]"
                    : "border-white/10 bg-[#0a1018]/60 text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {domain.code} · {domain.title}
              </button>
            );
          })}
        </div>

        {/* Active Frontier Dossier */}
        <div className="mt-6 grid gap-8 border border-white/10 bg-[#0a1018]/75 p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#c9a227]">
                Domain {selected.code} · Proposed Category
              </span>
              {drawerOpen && (
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Collapse detail focus"
                  className="text-white/40 hover:text-white md:hidden"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <h3 className="font-display mt-3 text-2xl font-light text-white sm:text-3xl">
              {selected.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              {selected.summary}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-5 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/40">
                Areas of conceptual inquiry
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-white/70">
                {selected.inquiryFocus.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1 w-1 bg-[#c9a227]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={selected.href} className="btn-quiet w-fit !py-2">
              Explore institutional scope <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
