import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
const poses = [
  ["ira-dev-2.webp", "Ira Dev standing in a contemporary glass office"],
  ["ira-dev-3.webp", "Ira Dev seated at her desk in an office"],
  ["ira-dev-4.webp", "Ira Dev looking over her shoulder in an office"],
  ["ira-dev-5.webp", "Ira Dev in a softly lit blue office portrait"],
  ["ira-dev-6.webp", "Ira Dev in a professional office portrait"],
  ["ira-dev-7.webp", "Ira Dev in a modern office portrait"]
] as const;
export const metadata: Metadata = {
  title: "Ira Dev",
  description: "Meet Ira Dev, MidShaSum Research's fictional AI-generated virtual executive and brand spokesperson.",
  alternates: { canonical: "/ira-dev" }
};
export default function IraDevPage() {
 return <><PageHero eyebrow="Virtual institutional voice" title="Ira Dev. A considered voice for a curious institution." body="Ira Dev is the AI-generated virtual executive and brand spokesperson developed for MidShaSum Research communications."/>
 <section className="section-space"><div className="container-shell grid gap-12 md:grid-cols-[.7fr_1.3fr]"><div className="relative min-h-[520px] overflow-hidden border border-[#c9a227]/20 bg-[#101216]"><Image src="/ira-dev/ira-dev-1.webp" alt="Ira Dev, fictional AI-generated virtual executive" fill priority unoptimized sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-top"/></div><div><div className="eyebrow">About the persona</div><h2 className="font-display mt-5 text-3xl font-light">A consistent, transparent communications identity.</h2><p className="mt-6 text-sm leading-8 text-white/55">Ira Dev is a fictional, AI-generated virtual executive and brand spokesperson created for MidShaSum Research communications. She is not a real employee, founder, director or statutory officer of the institution.</p><div className="mt-8 border-l border-[#c9a227] pl-5 text-sm leading-7 text-white/45">All public-facing uses of Ira Dev clearly disclose that the identity is fictional and AI-generated.</div></div></div></section>
 <section className="section-space border-y border-white/10 bg-[#0b0d10]"><div className="container-shell"><div className="eyebrow">Selected poses</div><h2 className="font-display mt-5 max-w-2xl text-3xl font-light">A unified visual identity across institutional communications.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{poses.map(([name,alt])=><div key={name} className="relative aspect-[4/5] overflow-hidden border border-white/10"><Image src={`/ira-dev/${name}`} alt={alt} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/></div>)}</div></div></section></>;
}
