import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureCard } from "@/components/feature-card";
import { Cpu, Workflow, Server, Code2 } from "lucide-react";
export const metadata: Metadata = { title: "Technology" };
export default function TechnologyPage() {
 return <><PageHero eyebrow="Technology" title="Engineering the systems behind new possibilities." body="We explore the architecture, software and computational infrastructure that can support research, analysis and intelligent workflows."/>
 <section className="section-space"><div className="container-shell grid gap-5 md:grid-cols-2"><FeatureCard number="01" title="Algorithmic systems" body="Research-oriented software architectures for systematic analysis, model execution and evaluation." icon={Cpu}/><FeatureCard number="02" title="Automation" body="Purposeful workflow automation designed to improve consistency, traceability and operational clarity." icon={Workflow}/><FeatureCard number="03" title="Data infrastructure" body="Approaches to data pipelines, storage, observability and dependable information flows." icon={Server}/><FeatureCard number="04" title="Software engineering" body="Maintainable application development, integration patterns, testing and secure engineering practices." icon={Code2}/></div></section>
 <section className="border-y border-white/10 bg-[#0b0d10] py-20"><div className="container-shell max-w-3xl"><div className="eyebrow">Our approach</div><h2 className="font-display mt-5 text-3xl font-light">Build for clarity, resilience and responsible use.</h2><p className="mt-6 text-sm leading-8 text-white/50">Technology initiatives are assessed against the problem they solve, the reliability they require, the risks they introduce and the people who will use them.</p></div></section></>;
}
