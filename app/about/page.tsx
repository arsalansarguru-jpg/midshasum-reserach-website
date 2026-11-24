import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Compass, Microscope, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return <>
    <PageHero eyebrow="About MidShaSum" title="An institution shaped by the pursuit of what comes next." body="MidShaSum Research is conceived as an independent research and technology institution combining quantitative inquiry, financial technology and systems engineering."/>
    <section className="section-space"><div className="container-shell grid gap-14 md:grid-cols-2"><SectionHeading eyebrow="Our philosophy" title="Progress begins where certainty ends."/><div className="text-sm leading-8 text-white/55"><p>We believe meaningful advancement requires more than adopting new tools or following prevailing assumptions. It requires asking better questions, testing ideas with discipline and building systems with care.</p><p className="mt-6">Our institutional approach is grounded in curiosity, methodological rigour, transparent communication and a commitment to continuous learning.</p></div></div></section>
    <section className="section-space border-y border-white/10 bg-[#0b0d10]"><div className="container-shell"><SectionHeading eyebrow="Guiding principles" title="The standards behind the exploration."/><div className="mt-12 grid gap-5 md:grid-cols-3"><Principle icon={Microscope} title="Rigorous inquiry" body="Questions are examined through structured research, testing and critical evaluation."/><Principle icon={Compass} title="Purposeful innovation" body="Technology is explored in service of clear problems and meaningful outcomes."/><Principle icon={ShieldCheck} title="Intellectual integrity" body="We distinguish evidence from hypothesis and communicate limitations clearly."/></div></div></section>
    <section className="section-space"><div className="container-shell grid gap-12 md:grid-cols-2"><div><div className="eyebrow">Vision</div><h2 className="font-display mt-5 text-3xl font-light">To contribute to a more thoughtful frontier of research and technology.</h2></div><div><div className="eyebrow">Mission</div><h2 className="font-display mt-5 text-3xl font-light">To investigate complex systems and develop considered, technology-led approaches through disciplined exploration.</h2></div></div></section>
  </>;
}
function Principle({icon:Icon,title,body}:{icon:typeof Microscope,title:string,body:string}) { return <div className="card-line p-7"><Icon className="text-[#c9a227]" size={24}/><h3 className="font-display mt-8 text-xl">{title}</h3><p className="mt-4 text-sm leading-7 text-white/45">{body}</p></div>; }
