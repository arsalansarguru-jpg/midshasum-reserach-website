import Link from "next/link";
import { ArrowDown, ArrowUpRight, Atom, Binary, Network, Microscope } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FeatureCard } from "@/components/feature-card";

export const metadata = {
  title: "Beyond the Known. By Design.",
  description:
    "MidShaSum Research is an independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return <>
    <section className="relative flex min-h-[720px] items-center overflow-hidden border-b border-white/10 md:min-h-[790px]">
      <div className="grid-glow absolute inset-0"/>
      <div className="hero-orb" aria-hidden="true"/>
      <div className="container-shell relative z-10 py-28">
        <div className="eyebrow mb-8">Independent Research & Technology</div>
        <h1 className="font-display max-w-4xl text-[clamp(2.1rem,8vw,5.5rem)] font-light leading-[1.08] tracking-[-.055em] text-white md:text-7xl lg:text-[88px]"><span className="block">Beyond the <span className="text-[#d8b84f]">Known.</span></span><span className="block">By Design.</span></h1>
        <p className="mt-9 max-w-xl text-base leading-8 text-white/55 md:text-lg">We explore the frontiers of quantitative research, financial technology and intelligent systems through disciplined inquiry and purposeful engineering.</p>
        <div className="mt-11 flex flex-wrap items-center gap-7"><Link href="/research" className="btn-gold">Explore our research <ArrowUpRight size={15}/></Link><Link href="/about" className="btn-quiet">Discover MidShaSum <ArrowUpRight size={15}/></Link></div>
        <div className="mt-28 flex items-center gap-3 text-[10px] tracking-[.2em] text-white/30"><ArrowDown size={13}/> SCROLL TO EXPLORE</div>
      </div>
      <div className="absolute bottom-0 right-0 hidden h-px w-1/3 bg-gradient-to-l from-[#c9a227]/70 to-transparent md:block"/>
    </section>

    <section className="section-space">
      <div className="container-shell grid gap-14 md:grid-cols-[.8fr_1.2fr]">
        <SectionHeading eyebrow="Our point of view" title="Curiosity is the beginning. Rigour is the method."/>
        <div className="pt-1"><p className="text-lg leading-9 text-white/65">The future is not approached through assumption. It is examined, modelled, challenged and engineered.</p><p className="mt-6 text-sm leading-8 text-white/40">MidShaSum Research brings together an institutional research mindset, technological development and quantitative thinking to investigate complex systems and develop considered approaches to emerging opportunities.</p><Link href="/about" className="btn-quiet mt-8">Our philosophy <ArrowUpRight size={15}/></Link></div>
      </div>
    </section>

    <section className="section-space border-y border-white/10 bg-[#0b0d10]">
      <div className="container-shell">
        <SectionHeading eyebrow="Research domains" title="A multidisciplinary approach to complex questions." body="Our areas of exploration sit at the intersection of financial markets, quantitative methods and technology."/>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <FeatureCard number="01 / QUANTITATIVE" title="Quantitative Research" body="Investigating market behaviour, statistical methods, systematic strategies and model evaluation." icon={Binary}/>
          <FeatureCard number="02 / FINANCIAL TECHNOLOGY" title="Financial Technology" body="Exploring technology-led approaches to financial workflows, analytical tools and market infrastructure." icon={Atom}/>
          <FeatureCard number="03 / INTELLIGENT SYSTEMS" title="Intelligent Systems" body="Designing and examining software systems, automation and data-informed processes." icon={Network}/>
        </div>
        <Link href="/research" className="btn-quiet mt-9">View research areas <ArrowUpRight size={15}/></Link>
      </div>
    </section>

    <section className="section-space">
      <div className="container-shell grid items-center gap-16 md:grid-cols-2">
        <div className="relative min-h-[390px] overflow-hidden border border-[#c9a227]/20 bg-[radial-gradient(ellipse_at_50%_45%,rgba(201,162,39,.15),transparent_58%),linear-gradient(145deg,#15191f,#08090b)]">
          <div className="absolute inset-8 border border-[#c9a227]/15"/>
          <div className="absolute inset-[18%] rotate-45 border border-[#c9a227]/20"/>
          <div className="absolute inset-[27%] -rotate-12 rounded-full border border-[#c9a227]/35"/>
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e1c46b] shadow-[0_0_40px_12px_rgba(201,162,39,.35)]"/>
          <div className="absolute bottom-8 left-8 eyebrow">Systems thinking / 001</div>
        </div>
        <div><SectionHeading eyebrow="Technology & systems" title="From abstract questions to engineered systems." body="We examine how robust software, computational methods and carefully designed infrastructure can turn complex ideas into usable systems."/><Link href="/technology" className="btn-gold mt-9">Explore technology <ArrowUpRight size={15}/></Link></div>
      </div>
    </section>

    <section className="section-space border-y border-white/10 bg-[#0b0d10]">
      <div className="container-shell grid gap-12 md:grid-cols-[1fr_.8fr]">
        <div><SectionHeading eyebrow="Institutional intelligence" title="Ideas, observations and evolving perspectives." body="A developing editorial space for research notes, analytical perspectives and considered commentary."/><Link href="/intelligence" className="btn-quiet mt-8">Enter intelligence <ArrowUpRight size={15}/></Link></div>
        <div className="card-line flex flex-col justify-between p-8"><Microscope className="text-[#c9a227]" size={25}/><div><div className="eyebrow">Editorial principle</div><p className="font-display mt-5 text-2xl font-light leading-9">Evidence before assertion. Clarity before conclusion.</p></div><span className="text-xs text-white/30">Research-led perspectives</span></div>
      </div>
    </section>

    <section className="section-space">
      <div className="container-shell">
        <div className="card-line relative overflow-hidden p-8 md:p-14">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#c9a227]/15"/>
          <div className="relative max-w-3xl"><div className="eyebrow">A virtual institutional voice</div><h2 className="font-display mt-6 text-3xl font-light md:text-5xl">Meet Ira Dev.</h2><p className="mt-6 max-w-xl text-sm leading-8 text-white/50">Ira Dev is MidShaSum Research’s fictional, AI-generated virtual executive and brand spokesperson. The identity is a communications persona and does not represent a real employee, founder, director or statutory officer.</p><Link href="/ira-dev" className="btn-quiet mt-7">Discover Ira Dev <ArrowUpRight size={15}/></Link></div>
        </div>
      </div>
    </section>

    <section className="section-space border-t border-white/10">
      <div className="container-shell text-center"><div className="eyebrow">Start a conversation</div><h2 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-light leading-tight tracking-[-.04em] md:text-6xl">Explore what we could examine together.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">For institutional enquiries, research collaboration, technology partnerships and licensing discussions.</p><Link href="/contact" className="btn-gold mt-9">Contact MidShaSum <ArrowUpRight size={15}/></Link></div>
    </section>
  </>;
}
