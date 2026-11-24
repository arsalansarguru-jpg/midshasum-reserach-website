import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BookOpen, ArrowUpRight } from "lucide-react";
export const metadata: Metadata = { title: "Intelligence" };
export default function IntelligencePage() {
 return <><PageHero eyebrow="Intelligence" title="A space for ideas, analysis and considered perspectives." body="The MidShaSum Research editorial platform is intended to share research notes, analytical perspectives and institutional observations as this body of work develops."/>
 <section className="section-space"><div className="container-shell"><div className="card-line max-w-3xl p-9 md:p-12"><BookOpen className="text-[#c9a227]" size={26}/><div className="eyebrow mt-9">Editorial programme</div><h2 className="font-display mt-4 text-3xl font-light">Research notes are in development.</h2><p className="mt-5 text-sm leading-8 text-white/50">New material will be published here when it has completed editorial and factual review. We prefer a considered publication record over a feed populated with unverified commentary.</p><div className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest text-[#d8b84f]">EVIDENCE · CONTEXT · PERSPECTIVE <ArrowUpRight size={14}/></div></div></div></section></>;
}
