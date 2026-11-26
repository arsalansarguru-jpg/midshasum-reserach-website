import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BookOpen, ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "The MidShaSum Research Intelligence library is being prepared for reviewed research notes, analysis and technology perspectives.",
  alternates: { canonical: "/intelligence" }
};
export default function IntelligencePage() {
 return <><PageHero scene="intelligence" eyebrow="Intelligence" title="A space for ideas, analysis and considered perspectives." body="The MidShaSum Research editorial platform is intended to share research notes, analytical perspectives and institutional observations as this body of work develops."/>
 <section className="section-space"><div className="container-shell grid gap-16 md:grid-cols-[.7fr_1.3fr]"><aside><div className="eyebrow">Library</div><h2 className="font-display mt-5 text-3xl font-light">A considered record, not a content feed.</h2><p className="mt-5 text-sm leading-7 text-white/45">Future pieces may include research notes, institutional perspectives, analytical commentary, technical articles and publications.</p></aside><div className="border-y border-white/10 py-9"><div className="flex items-start gap-5"><BookOpen className="mt-1 shrink-0 text-[#c9a227]" size={24}/><div><div className="eyebrow">Editorial programme</div><h2 className="font-display mt-4 text-2xl font-light">No publications yet.</h2><p className="mt-4 max-w-xl text-sm leading-8 text-white/50">New material will appear here after editorial and factual review. No articles or market opinions are attributed to individuals at this time.</p><div className="mt-7 inline-flex items-center gap-2 text-xs tracking-widest text-[#d8b84f]">EVIDENCE · CONTEXT · PERSPECTIVE <ArrowUpRight size={14}/></div></div></div></div></div></section></>;
}
