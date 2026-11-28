import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { IntelligenceLibrary } from "@/components/intelligence-library";
import { intelligenceArticles } from "@/lib/intelligence";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "The MidShaSum Research Intelligence library is being prepared for reviewed research notes, analysis and technology perspectives.",
  alternates: { canonical: "/intelligence" }
};

export default function IntelligencePage() {
  return (
    <>
      <PageHero
        scene="intelligence"
        eyebrow="Intelligence"
        title="A space for ideas, analysis and considered perspectives."
        body="The MidShaSum Research editorial platform is intended to share research notes, analytical perspectives and institutional observations as this body of work develops."
      />
      <section className="band-ivory section-space">
        <div className="container-shell grid gap-16 md:grid-cols-[.65fr_1.35fr]">
          <aside>
            <div className="eyebrow-ivory">Library</div>
            <h2 className="type-section mt-5 text-[#0B0E13]">
              A considered record, not a content feed.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#4E5561]">
              Future pieces may include research notes, institutional perspectives, analytical commentary, technical articles and publications.
            </p>
          </aside>
          <IntelligenceLibrary articles={intelligenceArticles} />
        </div>
      </section>
    </>
  );
}
