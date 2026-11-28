import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { MethodologySpatial } from "@/components/spatial/methodology-spatial";
import { Binary, ChartNoAxesCombined, Database, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore MidShaSum Research's areas of interest in quantitative methods, financial markets, data analysis and model evaluation.",
  alternates: { canonical: "/research" }
};

const DISCIPLINES = [
  {
    number: "01",
    title: "Quantitative methods",
    body: "Statistical reasoning, model construction, hypothesis testing and analytical methods for complex datasets.",
    icon: Binary
  },
  {
    number: "02",
    title: "Market structure",
    body: "Exploration of market behaviour, liquidity, volatility, execution dynamics and regime characteristics.",
    icon: ChartNoAxesCombined
  },
  {
    number: "03",
    title: "Data research",
    body: "Data quality, processing, feature analysis, reproducibility and responsible use of information.",
    icon: Database
  },
  {
    number: "04",
    title: "Model evaluation",
    body: "Backtesting methodology, robustness checks, sensitivity analysis and out-of-sample evaluation.",
    icon: FlaskConical
  }
] as const;

export default function ResearchPage() {
  return (
    <>
      <PageHero
        scene="research"
        eyebrow="Research"
        title="Investigating systems. Testing assumptions. Building understanding."
        body="Our research interests span quantitative methods, financial markets, data analysis and the evaluation of systematic approaches. This page describes areas of exploration, not claims of completed or independently validated results."
      />

      {/* Warm Ivory 4-Discipline Analytical Ledger */}
      <section className="band-ivory section-space border-b border-black/10">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="eyebrow-ivory">Areas of Exploration</p>
            <h2 className="type-section mt-5 text-[#0B0E13]">
              Four interconnected domains of inquiry.
            </h2>
          </div>

          <div className="mt-14 grid gap-0 border-t border-black/12 md:grid-cols-2">
            {DISCIPLINES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className={`border-b border-black/12 py-9 ${
                    idx % 2 === 1 ? "md:border-l md:border-black/12 md:pl-10" : "md:pr-10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-[#8C6D14]">
                      {item.number}
                    </span>
                    <Icon size={18} className="text-[#8C6D14]" aria-hidden="true" />
                  </div>
                  <h3 className="type-card mt-5 text-[#0B0E13]">{item.title}</h3>
                  <p className="type-body-sm mt-3 max-w-lg text-[#4E5561]">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Navy Method Before Conclusion */}
      <section className="band-navy section-space border-b border-white/10">
        <div className="container-shell grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Method before conclusion</div>
            <h2 className="type-section mt-5 text-[#F2F0E9]">
              A result is only as useful as the method that supports it.
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-8 text-white/70 sm:text-base">
            <p>
              Research is approached through clearly framed questions, appropriate data selection, explicit assumptions and repeatable analysis. Methods should be tested for sensitivity to data, parameter choices, costs and changing conditions.
            </p>
            <p>
              Any future publication should identify its sources, evaluation period, methodology, limitations and relevant conflicts. Historical or simulated analysis must never be represented as a guarantee of future outcomes.
            </p>
            <p className="border-l-2 border-[#C9A227] pl-5 text-white/60">
              The disciplines described here are areas of interest. They do not imply completed studies, validated models or performance results.
            </p>
          </div>
        </div>
      </section>

      <MethodologySpatial />

      {/* Obsidian Future Publications */}
      <section className="band-obsidian section-space">
        <div className="container-shell grid gap-10 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="eyebrow">Future publications</div>
            <h2 className="type-section mt-5 text-[#F2F0E9]">
              A research record built in public, when ready.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-white/65 sm:text-base">
            Research publications will be added to the Intelligence library only after appropriate factual and editorial review. No completed research papers or results are being represented here at this time.
          </p>
        </div>
      </section>
    </>
  );
}
