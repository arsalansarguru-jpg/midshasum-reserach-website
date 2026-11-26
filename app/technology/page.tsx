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
export default function TechnologyPage() {
 return <><PageHero scene="technology" eyebrow="Technology" title="Engineering the systems behind new possibilities." body="We explore the architecture, software and computational infrastructure that can support research, analysis and intelligent workflows."/>
 <section className="section-space"><div className="container-shell grid gap-5 md:grid-cols-2"><FeatureCard number="01" title="Algorithmic systems" body="Research-oriented software architectures for systematic analysis, model execution and evaluation." icon={Cpu}/><FeatureCard number="02" title="Automation" body="Purposeful workflow automation designed to improve consistency, traceability and operational clarity." icon={Workflow}/><FeatureCard number="03" title="Data infrastructure" body="Approaches to data pipelines, storage, observability and dependable information flows." icon={Server}/><FeatureCard number="04" title="Software engineering" body="Maintainable application development, integration patterns, testing and secure engineering practices." icon={Code2}/></div></section>
 <section className="section-space border-y border-white/10 bg-[#0b0d10]"><div className="container-shell grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><div className="eyebrow">Engineering principle</div><h2 className="font-display mt-5 text-3xl font-light leading-tight md:text-4xl">Build for clarity, resilience and responsible use.</h2></div><div className="space-y-5 text-sm leading-8 text-white/50"><p>Technology initiatives are assessed against the problem they solve, the reliability they require, the risks they introduce and the people who will use them.</p><p>Clear interfaces between components, explicit data handling, testable behaviour and maintainable documentation help make systems easier to understand and evaluate.</p><p className="border-l border-[#c9a227] pl-5 text-white/40">These are areas of exploration and engineering practice, not claims of deployed proprietary platforms or existing client systems.</p></div></div></section></>;
}
