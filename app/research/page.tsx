import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureCard } from "@/components/feature-card";
import { MethodologySpatial } from "@/components/spatial/methodology-spatial";
import { Binary, ChartNoAxesCombined, Database, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore MidShaSum Research's areas of interest in quantitative methods, financial markets, data analysis and model evaluation.",
  alternates: { canonical: "/research" }
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        scene="research"
        eyebrow="Research"
        title="Investigating systems. Testing assumptions. Building understanding."
        body="Our research interests span quantitative methods, financial markets, data analysis and the evaluation of systematic approaches. This page describes areas of exploration, not claims of completed or independently validated results."
      />

      <section className="section-space">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          <FeatureCard
            number="01"
            title="Quantitative methods"
            body="Statistical reasoning, model construction, hypothesis testing and analytical methods for complex datasets."
            icon={Binary}
          />
          <FeatureCard
            number="02"
            title="Market structure"
            body="Exploration of market behaviour, liquidity, volatility, execution dynamics and regime characteristics."
            icon={ChartNoAxesCombined}
          />
          <FeatureCard
            number="03"
            title="Data research"
            body="Data quality, processing, feature analysis, reproducibility and responsible use of information."
            icon={Database}
          />
          <FeatureCard
            number="04"
            title="Model evaluation"
            body="Backtesting methodology, robustness checks, sensitivity analysis and out-of-sample evaluation."
            icon={FlaskConical}
          />
        </div>
      </section>

      <MethodologySpatial />

      <section className="section-space border-y border-white/10 bg-[#0b0d10]">
        <div className="container-shell grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Method before conclusion</div>
            <h2 className="font-display mt-5 text-3xl font-light leading-tight md:text-4xl">
              A result is only as useful as the method that supports it.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-white/50">
            <p>
              Research is approached through clearly framed questions, appropriate data selection, explicit assumptions and repeatable analysis. Methods should be tested for sensitivity to data, parameter choices, costs and changing conditions.
            </p>
            <p>
              Any future publication should identify its sources, evaluation period, methodology, limitations and relevant conflicts. Historical or simulated analysis must never be represented as a guarantee of future outcomes.
            </p>
            <p className="border-l border-[#c9a227] pl-5 text-white/40">
              The disciplines described here are areas of interest. They do not imply completed studies, validated models or performance results.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="eyebrow">Future publications</div>
            <h2 className="font-display mt-5 text-3xl font-light">
              A research record built in public, when ready.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-white/50">
            Research publications will be added to the Intelligence library only after appropriate factual and editorial review. No completed research papers or results are being represented here at this time.
          </p>
        </div>
      </section>
    </>
  );
}
