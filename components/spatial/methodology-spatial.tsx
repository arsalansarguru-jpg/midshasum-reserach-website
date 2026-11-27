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
    title: "Observe",
    subtitle: "Empirical Signal & Context",
    description:
      "Examine complex systems, market behaviour, and technological shifts without imposing premature narratives.",
    principle: "Separate raw observation from interpretation."
  },
  {
    step: "02",
    title: "Question",
    subtitle: "Problem Framing",
    description:
      "Formulate falsifiable, structurally meaningful questions that challenge prevailing institutional assumptions.",
    principle: "A question poorly framed limits every subsequent step."
  },
  {
    step: "03",
    title: "Investigate",
    subtitle: "Data & Literature Synthesis",
    description:
      "Assemble clean datasets, trace causal mechanisms, and audit prior methods before constructing models.",
    principle: "Data provenance precedes model complexity."
  },
  {
    step: "04",
    title: "Experiment",
    subtitle: "Controlled Simulation",
    description:
      "Build reproducible computational experiments to test hypotheses across varying regimes and boundary conditions.",
    principle: "Test for fragility, not just favourable outcomes."
  },
  {
    step: "05",
    title: "Validate",
    subtitle: "Out-of-Sample Rigour",
    description:
      "Subject findings to sensitivity checks, cost realism, and adversarial review with uncertainty kept explicit.",
    principle: "Simulation is never represented as a guarantee."
  },
  {
    step: "06",
    title: "Advance",
    subtitle: "Institutional Knowledge",
    description:
      "Distil verified understanding into durable systems, technical notes, and refined questions for the next cycle.",
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
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#050608] py-24 md:py-32"
    >
      {/* Subtle architectural coordinate backdrop */}
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
          {/* Left: Spatial Orbital / Axial Process Diagram */}
          <div>
            <p className="eyebrow">05 / Proposed Research Methodology</p>
            <h2 className="font-display mt-5 text-3xl font-light leading-tight tracking-[-.045em] text-white sm:text-5xl">
              Discipline before <span className="text-[#d8b84f]">conclusion.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              A proposed six-stage inquiry cycle designed to keep assumptions explicit, experiments reproducible, and uncertainty visible.
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
                  {/* Outer calibrated ring */}
                  <circle
                    cx="170"
                    cy="170"
                    r="134"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  {/* Inner gold ring */}
                  <circle
                    cx="170"
                    cy="170"
                    r="86"
                    fill="none"
                    stroke="rgba(201,162,39,0.28)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  {/* Crosshair axes */}
                  <line x1="170" y1="20" x2="170" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="20" y1="170" x2="320" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {/* Active vector line from center to selected stage */}
                  {(() => {
                    const angle = (activeIndex / STAGES.length) * Math.PI * 2 - Math.PI / 2;
                    const x = 170 + Math.cos(angle) * 134;
                    const y = 170 + Math.sin(angle) * 134;
                    return (
                      <line
                        x1="170"
                        y1="170"
                        x2={x}
                        y2={y}
                        stroke="#c9a227"
                        strokeWidth="1.5"
                      />
                    );
                  })()}

                  {/* Center label */}
                  <text
                    x="170"
                    y="164"
                    textAnchor="middle"
                    className="fill-[#e1c46b] font-mono text-[10px] uppercase tracking-[0.24em]"
                  >
                    STAGE {active.step}
                  </text>
                  <text
                    x="170"
                    y="186"
                    textAnchor="middle"
                    className="fill-white font-display text-[18px] font-light"
                  >
                    {active.title}
                  </text>
                </svg>

                {/* Interactive Stage Nodes positioned around the ring */}
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
                      style={{ left: `${pctX}%`, top: `${pctY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 border px-2.5 py-1.5 font-mono text-[10px] tracking-[.14em] transition-all ${
                        isActive
                          ? "border-[#c9a227] bg-[#c9a227] text-[#050608] font-bold scale-105"
                          : "border-white/20 bg-[#0a1018] text-white/75 hover:border-[#c9a227]/60 hover:text-white"
                      }`}
                    >
                      {stage.step}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Active Stage Spatial Readout + Sequential Index */}
          <div className="space-y-6">
            <motion.div
              key={active.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="border border-[#c9a227]/30 bg-[#0a1018]/85 p-7 sm:p-9"
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

            {/* Compact sequential selector list */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`border px-3.5 py-3 text-left transition-colors ${
                      isActive
                        ? "border-[#c9a227]/70 bg-[#c9a227]/10 text-white"
                        : "border-white/10 bg-[#0a1018]/40 text-white/55 hover:border-white/25 hover:text-white"
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

