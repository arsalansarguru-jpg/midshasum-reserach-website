import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MidShaSum Research's philosophy, mission and principles for disciplined research and responsible technology.",
  alternates: { canonical: "/about" }
};
export default function AboutPage() {
  return <>
    <PageHero scene="institution" eyebrow="About MidShaSum" title="An institution shaped by the pursuit of what comes next." body="MidShaSum Research is an independent research and technology institution combining quantitative inquiry, financial technology and systems engineering."/>
    <section className="section-space"><div className="container-shell grid gap-14 md:grid-cols-2"><SectionHeading eyebrow="Our philosophy" title="Progress begins where certainty ends."/><div className="text-sm leading-8 text-white/55"><p>We believe meaningful advancement requires more than adopting new tools or following prevailing assumptions. It requires asking better questions, testing ideas with discipline and building systems with care.</p><p className="mt-6">Our institutional approach is grounded in curiosity, methodological rigour, transparent communication and a commitment to continuous learning.</p></div></div></section>
    <section className="section-space border-y border-white/10"><div className="container-shell"><SectionHeading eyebrow="Guiding principles" title="The standards behind the exploration."/><div className="mt-12 grid gap-6 md:grid-cols-2">{[
      ["01", "Intellectual curiosity", "Ask meaningful questions and remain open to evidence that challenges prior assumptions."],
      ["02", "Scientific rigour", "Use structured methods, transparent assumptions and critical evaluation."],
      ["03", "Engineering precision", "Treat reliability, maintainability and clear purpose as design requirements."],
      ["04", "Responsible innovation", "Consider foreseeable risks, limitations and the people affected by new systems."],
      ["05", "Transparency", "Distinguish established facts, working hypotheses and areas of uncertainty."],
      ["06", "Continuous exploration", "Refine questions and methods as knowledge, tools and context evolve."]
    ].map(([number, title, body]) => <div key={number} className="glass-card p-6 md:p-7"><div className="eyebrow">{number}</div><h3 className="type-card mt-4 text-white">{title}</h3><p className="type-body-sm mt-3 max-w-lg text-white/55">{body}</p></div>)}</div></div></section>
    <section className="section-space"><div className="container-shell grid gap-6 md:grid-cols-2"><div className="glass-card p-8"><div className="eyebrow">Vision</div><h2 className="type-section mt-5 text-white">To contribute to a more thoughtful frontier of research and technology.</h2></div><div className="glass-card p-8"><div className="eyebrow">Mission</div><h2 className="type-section mt-5 text-white">To investigate complex systems and develop considered, technology-led approaches through disciplined exploration.</h2></div></div></section>
  </>;
}
