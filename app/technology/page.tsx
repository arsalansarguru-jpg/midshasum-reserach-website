import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureCard } from "@/components/feature-card";
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

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        scene="technology"
        eyebrow="Technology"
        title="Engineering the systems behind new possibilities."
        body="We explore the architecture, software and computational infrastructure that can support research, analysis and intelligent workflows."
      />

      <section className="section-space">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          <FeatureCard
            number="01"
            title="Algorithmic systems"
            body="Research-oriented software architectures for systematic analysis, model execution and evaluation."
            icon={Cpu}
          />
          <FeatureCard
            number="02"
            title="Automation"
            body="Purposeful workflow automation designed to improve consistency, traceability and operational clarity."
            icon={Workflow}
          />
          <FeatureCard
            number="03"
            title="Data infrastructure"
            body="Approaches to data pipelines, storage, observability and dependable information flows."
            icon={Server}
          />
          <FeatureCard
            number="04"
            title="Software engineering"
            body="Maintainable application development, integration patterns, testing and secure engineering practices."
            icon={Code2}
          />
        </div>
      </section>

      {/* Architectural Stack Diagram */}
      <section className="section-space border-t border-white/10 bg-[#080a0e]">
        <div className="container-shell">
          <div className="max-w-2xl">
            <div className="eyebrow">Conceptual Stack</div>
            <h2 className="font-display mt-5 text-3xl font-light leading-tight md:text-4xl">
              Layered systems architecture for reproducible inquiry.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/50">
              Each engineering layer separates concerns cleanly so data provenance, computation and verification can be audited independently.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {architectureLayers.map((item) => (
              <div
                key={item.layer}
                className="glass-card grid gap-6 p-6 md:grid-cols-[0.7fr_1.3fr_1fr] md:items-center md:p-8"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#c9a227]">
                    {item.layer}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-light text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-white/55">{item.description}</p>
                <ul className="space-y-2 border-t border-white/10 pt-4 text-xs text-white/65 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5">
                      <span className="h-1 w-1 bg-[#c9a227]" aria-hidden="true" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#0b0d10]">
        <div className="container-shell grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Engineering principle</div>
            <h2 className="font-display mt-5 text-3xl font-light leading-tight md:text-4xl">
              Build for clarity, resilience and responsible use.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-white/50">
            <p>
              Technology initiatives are assessed against the problem they solve, the reliability they require, the risks they introduce and the people who will use them.
            </p>
            <p>
              Clear interfaces between components, explicit data handling, testable behaviour and maintainable documentation help make systems easier to understand and evaluate.
            </p>
            <p className="border-l border-[#c9a227] pl-5 text-white/40">
              These are areas of exploration and engineering practice, not claims of deployed proprietary platforms or existing client systems.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
