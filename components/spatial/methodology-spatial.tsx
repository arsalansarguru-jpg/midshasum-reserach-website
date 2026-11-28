"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MethodologyStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  principle: string;
}

const STAGES: MethodologyStage[] = [
  {
    step: "01",
    title: "Research Question",
    subtitle: "Problem Framing",
    description:
      "Define a falsifiable, structurally meaningful question grounded in empirical observation before selecting tools or models.",
    principle: "A question poorly framed limits every subsequent step."
  },
  {
    step: "02",
    title: "Data",
    subtitle: "Provenance & Integrity",
    description:
      "Assemble clean, point-in-time datasets with documented sources, survivorship checks, and explicit handling of missingness.",
    principle: "Data provenance precedes model complexity."
  },
  {
    step: "03",
    title: "Method",
    subtitle: "Analytical & Computational Design",
    description:
      "Construct transparent statistical or computational procedures with explicit assumptions and reproducible parameters.",
    principle: "Separate established theory from exploratory heuristics."
  },
  {
    step: "04",
    title: "Validation",
    subtitle: "Out-of-Sample Rigour",
    description:
      "Test hypotheses across varying regimes, transaction costs, and sensitivity sweeps to surface fragility rather than favourable fits.",
    principle: "Simulation is never represented as a guarantee."
  },
  {
    step: "05",
    title: "Interpretation",
    subtitle: "Uncertainty & Scope",
    description:
      "Evaluate what the evidence supports, where bounds of confidence end, and which alternative explanations remain plausible.",
    principle: "Keep limitations and uncertainty explicit."
  },
  {
    step: "06",
    title: "Publication",
    subtitle: "Editorial & Factual Review",
    description:
      "Distil reviewed work into clear institutional notes identifying sources, evaluation periods, methodology, and conflicts.",
    principle: "Publish only after factual and editorial review."
  }
];

export function MethodologySpatial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STAGES[activeIndex];

  return (
    <section
      id="section-methodology"
      data-spatial-section="methodology"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#080808] py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 72% 48%, rgba(201,162,39,0.08), transparent 45%), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "auto, 72px 72px, 72px 72px"
        }}
      />

      <div className="container-shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Proposed Research Methodology</p>
            <h2 className="type-section mt-5 text-[#f7f7f5]">
              Discipline before <span className="text-[#e1c46b]">conclusion.</span>
            </h2>
            <p className="type-body-sm mt-5 max-w-md text-white/55">
              A proposed six-stage inquiry sequence: Research Question → Data → Method → Validation → Interpretation → Publication.
            </p>
            <p className="mt-4 max-w-md border-l border-[#c9a227] pl-4 text-xs leading-6 text-white/45">
              Conceptual framework only: this sequence describes intended institutional standards, not completed studies or validated findings.
            </p>

            {/* Interactive SVG Spatial Ring */}
            <div className="relative mt-10 flex items-center justify-center sm:justify-start">
              <div className="relative h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]">
                <svg
                  viewBox="0 0 340 340"
                  className="h-full w-full"
                  role="img"
                  aria-label="Six-stage institutional research methodology diagram"
                >
                  <circle cx="170" cy="170" r="134" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <circle cx="170" cy="170" r="86" fill="none" stroke="rgba(201,162,39,0.28)" strokeWidth="1" strokeDasharray="4 6" />
                  <line x1="170" y1="20" x2="170" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="20" y1="170" x2="320" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {(() => {
                    const angle = (activeIndex / STAGES.length) * Math.PI * 2 - Math.PI / 2;
                    const x = 170 + Math.cos(angle) * 134;
                    const y = 170 + Math.sin(angle) * 134;
                    return <line x1="170" y1="170" x2={x} y2={y} stroke="#c9a227" strokeWidth="1.5" />;
                  })()}

                  <text
                    x="170"
                    y="162"
                    textAnchor="middle"
                    className="fill-[#e1c46b] font-mono text-[10px] uppercase tracking-[0.24em]"
                  >
                    STAGE {active.step}
                  </text>
                  <text
                    x="170"
                    y="186"
                    textAnchor="middle"
                    className="fill-white font-display text-[15px] font-light"
                  >
                    {active.title}
                  </text>
                </svg>

                {STAGES.map((stage, index) => {
                  const angle = (index / STAGES.length) * Math.PI * 2 - Math.PI / 2;
                  const pctX = 50 + Math.cos(angle) * 39.4;
                  const pctY = 50 + Math.sin(angle) * 39.4;
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Stage ${stage.step}: ${stage.title}`}
                      style={{ left: `${pctX}%`, top: `${pctY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 border px-2.5 py-1.5 font-mono text-[10px] tracking-[.14em] transition-all ${
                        isActive
                          ? "border-[#c9a227] bg-[#c9a227] text-[#080808] font-bold scale-105"
                          : "border-white/20 bg-[#101216] text-white/75 hover:border-[#c9a227]/60 hover:text-white"
                      }`}
                    >
                      {stage.step}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              key={active.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="glass-card-gold p-7 sm:p-9"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[.24em] text-[#e1c46b]">
                  Phase {active.step} / 06
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40">
                  {active.subtitle}
                </span>
              </div>
              <h3 className="font-display mt-6 text-3xl font-light text-white sm:text-4xl">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-white/65 sm:text-base">
                {active.description}
              </p>
              <p className="mt-6 border-l border-[#c9a227] pl-4 text-xs italic leading-6 text-white/50">
                {active.principle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`px-3.5 py-3 text-left ${
                      isActive
                        ? "glass-card-gold text-white"
                        : "glass-card-interactive text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="block font-mono text-[9px] tracking-[.2em] text-[#c9a227]">
                      {stage.step}
                    </span>
                    <span className="font-display mt-1 block text-sm font-light">
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
