import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Cpu, Workflow, Server, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "MidShaSum Research explores algorithmic systems, automation, data infrastructure and software engineering.",
  alternates: { canonical: "/technology" }
};

const architectureLayers = [
  {
    layer: "Layer 01",
    title: "Data & Ingestion Infrastructure",
    specs: ["Schema validation & provenance", "Deterministic time-series storage", "Audit-ready transformation logs"],
    description: "Structured pipelines that preserve data lineage, point-in-time integrity and reproducible snapshots."
  },
  {
    layer: "Layer 02",
    title: "Computational & Simulation Engine",
    specs: ["Modular algorithmic execution", "Parameterized sensitivity sweeps", "Isolated experiment sandboxes"],
    description: "Research-grade execution environments built to test models across regimes without hidden state."
  },
  {
    layer: "Layer 03",
    title: "Verification & Observability",
    specs: ["Automated regression suites", "Telemetry & latency profiling", "Explicit failure-mode reporting"],
    description: "Continuous verification layers ensuring systems behave predictably under boundary conditions."
  }
];

const technologyDomains = [
  {
    number: "01",
    title: "Algorithmic systems",
    body: "Research-oriented software architectures for systematic analysis, model execution and evaluation.",
    icon: Cpu
  },
  {
    number: "02",
    title: "Automation",
    body: "Purposeful workflow automation designed to improve consistency, traceability and operational clarity.",
    icon: Workflow
  },
  {
    number: "03",
    title: "Data infrastructure",
    body: "Approaches to data pipelines, storage, observability and dependable information flows.",
    icon: Server
  },
  {
    number: "04",
    title: "Software engineering",
    body: "Maintainable application development, integration patterns, testing and secure engineering practices.",
    icon: Code2
  }
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        scene="technology"
        eyebrow="Technology"
        title="Engineering the systems behind new possibilities."
        body="We explore the architecture, software and computational infrastructure that can support research, analysis and intelligent workflows."
      />

      {/* Warm Ivory Conceptual Architecture Blueprint */}
      <section className="band-ivory section-space border-b border-black/10">
        <div className="container-shell">
          <div className="max-w-2xl">
            <div className="eyebrow-ivory">Conceptual Stack</div>
            <h2 className="type-section mt-5 text-[#0B0E13]">
              Layered systems architecture for reproducible inquiry.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4E5561] sm:text-base">
              Each engineering layer separates concerns cleanly so data provenance, computation and verification can be audited independently.
            </p>
          </div>

          <div className="mt-14 divide-y divide-black/12 border-y border-black/12">
            {architectureLayers.map((item) => (
              <div
                key={item.layer}
                className="grid gap-6 py-8 md:grid-cols-[0.75fr_1.25fr_1fr] md:items-start md:gap-10 md:py-10"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#8C6D14]">
                    {item.layer}
                  </span>
                  <h3 className="type-card mt-2 text-[#0B0E13]">
                    {item.title}
                  </h3>
                </div>
                <p className="type-body-sm text-[#4E5561]">{item.description}</p>
                <ul className="space-y-2.5 border-t border-black/10 pt-4 text-xs text-[#0B0E13]/80 md:border-l md:border-t-0 md:border-black/12 md:pl-8 md:pt-0">
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#C9A227]" aria-hidden="true" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Navy Engineering Domains */}
      <section className="band-navy section-space border-b border-white/10">
        <div className="container-shell">
          <div className="max-w-2xl">
            <div className="eyebrow">Engineering Domains</div>
            <h2 className="type-section mt-5 text-[#F2F0E9]">
              Core areas of technical exploration.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technologyDomains.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="border border-white/12 bg-[#080A0D]/55 p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#C9A227]">
                      {item.number}
                    </span>
                    <Icon size={17} className="text-[#C9A227]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-normal text-[#F2F0E9]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Obsidian Engineering Principle */}
      <section className="band-obsidian section-space">
        <div className="container-shell grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Engineering principle</div>
            <h2 className="type-section mt-5 text-[#F2F0E9]">
              Build for clarity, resilience and responsible use.
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-8 text-white/65 sm:text-base">
            <p>
              Technology initiatives are assessed against the problem they solve, the reliability they require, the risks they introduce and the people who will use them.
            </p>
            <p>
              Clear interfaces between components, explicit data handling, testable behaviour and maintainable documentation help make systems easier to understand and evaluate.
            </p>
            <p className="border-l-2 border-[#C9A227] pl-5 text-white/55">
              These are areas of exploration and engineering practice, not claims of deployed proprietary platforms or existing client systems.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
