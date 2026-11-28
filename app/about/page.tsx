import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MidShaSum Research's philosophy, mission and principles for disciplined research and responsible technology.",
  alternates: { canonical: "/about" }
};

const PRINCIPLES = [
  ["01", "Intellectual curiosity", "Ask meaningful questions and remain open to evidence that challenges prior assumptions."],
  ["02", "Scientific rigour", "Use structured methods, transparent assumptions and critical evaluation."],
  ["03", "Engineering precision", "Treat reliability, maintainability and clear purpose as design requirements."],
  ["04", "Responsible innovation", "Consider foreseeable risks, limitations and the people affected by new systems."],
  ["05", "Transparency", "Distinguish established facts, working hypotheses and areas of uncertainty."],
  ["06", "Continuous exploration", "Refine questions and methods as knowledge, tools and context evolve."]
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        scene="institution"
        eyebrow="About MidShaSum"
        title="An institution shaped by the pursuit of what comes next."
        body="MidShaSum Research is an independent research and technology institution combining quantitative inquiry, financial technology and systems engineering."
      />

      {/* Warm Ivory Editorial Philosophy + Vision & Mission */}
      <section className="band-ivory section-space border-b border-black/10">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="eyebrow-ivory">Our philosophy</p>
              <h2 className="type-section mt-5 text-[#0B0E13]">
                Progress begins where <span className="text-[#8C6D14]">certainty ends.</span>
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#4E5561]">
              <p>
                We believe meaningful advancement requires more than adopting new tools or following prevailing assumptions. It requires asking better questions, testing ideas with discipline and building systems with care.
              </p>
              <p>
                Our institutional approach is grounded in curiosity, methodological rigour, transparent communication and a commitment to continuous learning.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-black/12 pt-14 md:grid-cols-2 md:gap-16">
            <div className="border-l-2 border-[#C9A227] pl-6">
              <p className="eyebrow-ivory">Vision</p>
              <h2 className="font-display mt-4 text-2xl font-light leading-snug tracking-[-0.02em] text-[#0B0E13] sm:text-3xl">
                To contribute to a more thoughtful frontier of research and technology.
              </h2>
            </div>
            <div className="border-l-2 border-black/20 pl-6">
              <p className="eyebrow-ivory">Mission</p>
              <h2 className="font-display mt-4 text-2xl font-light leading-snug tracking-[-0.02em] text-[#0B0E13] sm:text-3xl">
                To investigate complex systems and develop considered, technology-led approaches through disciplined exploration.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Obsidian Architectural Principles Ledger */}
      <section className="band-obsidian section-space">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Guiding principles</p>
            <h2 className="type-section mt-5 text-[#F2F0E9]">
              The standards behind the exploration.
            </h2>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-0 border-t border-white/12 md:grid-cols-2">
            {PRINCIPLES.map(([number, title, body]) => (
              <div
                key={number}
                className="border-b border-white/12 py-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs tracking-[0.2em] text-[#C9A227]">
                    {number}
                  </span>
                  <div>
                    <h3 className="type-card text-[#F2F0E9]">{title}</h3>
                    <p className="type-body-sm mt-3 max-w-lg text-white/60">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
