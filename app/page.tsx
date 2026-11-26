import Link from "next/link";
import { ArrowDown, ArrowUpRight, Atom, Binary, Network, Microscope } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SpatialViewport } from "@/components/spatial/spatial-viewport";

export const metadata = {
  title: "Beyond the Known. By Design.",
  description:
    "MidShaSum Research is an independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
  alternates: { canonical: "/" }
};

const frontiers = [
  ["01", "Quantitative research", "Statistical methods, market structure and the careful evaluation of systematic approaches.", Binary, "/research"],
  ["02", "Financial technology", "Engineered tools and computational methods for evolving financial systems.", Atom, "/technology"],
  ["03", "Intelligent systems", "Information, automation and analytical systems considered with purpose.", Network, "/intelligence"]
] as const;

export default function HomePage() {
  return <>
    <section className="spatial-hero spatial-home relative isolate flex min-h-[700px] items-center overflow-hidden border-b border-white/10 md:min-h-[790px]">
      <SpatialViewport variant="institution"/>
      <div className="grid-glow absolute inset-0 opacity-50"/>
      <div className="container-shell relative z-10 py-24 md:py-32">
        <div className="max-w-[740px]">
          <div className="eyebrow mb-8">Independent Research &amp; Technology</div>
          <p className="font-display text-[11px] font-medium tracking-[.34em] text-white/55 sm:text-xs">MIDSHASUM RESEARCH</p>
          <h1 className="font-display mt-7 max-w-3xl text-[clamp(2.8rem,8vw,6.6rem)] font-light leading-[1.02] tracking-[-.065em] text-white">
            Beyond the <span className="text-[#d8b84f]">Known.</span>
            <br/>By Design.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Exploring the frontiers of research, intelligence and technology through systematic inquiry, engineered thinking and purposeful innovation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/research" className="btn-gold">Explore Our Research <ArrowUpRight size={15}/></Link>
            <Link href="/about" className="btn-quiet">Discover MidShaSum <ArrowUpRight size={15}/></Link>
          </div>
          <div className="mt-20 flex items-center gap-3 text-[10px] tracking-[.2em] text-white/40">
            <ArrowDown size={13}/> SCROLL TO EXPLORE
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="spatial-index absolute bottom-8 right-8 hidden text-[9px] text-white/35 md:block">MSR / FIELD 001&nbsp;&nbsp; 00° 00′</div>
    </section>

    <section className="section-space">
      <div className="container-shell grid gap-14 md:grid-cols-[.8fr_1.2fr]">
        <SectionHeading eyebrow="01 / The institution" title="Curiosity opens the question. Rigour shapes the search."/>
        <div className="max-w-2xl pt-1">
          <p className="text-lg leading-9 text-white/70">MidShaSum Research is an independent research and technology institution exploring complex systems and the connections between them.</p>
          <p className="mt-6 text-sm leading-8 text-white/50">Our perspective is grounded in disciplined inquiry, independent thinking and purposeful engineering. We seek to understand before we assert, and to build capability for questions that are still taking shape.</p>
          <Link href="/about" className="btn-quiet mt-7">Our philosophy <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>

    <section className="section-space border-y border-white/10 bg-[#0b0d10]">
      <div className="container-shell">
        <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <SectionHeading eyebrow="02 / Research frontiers" title="Intersections are where new questions emerge."/>
          <p className="max-w-xl pb-1 text-sm leading-8 text-white/50">We explore connected domains through evidence-led research, considered analysis and an openness to emerging possibilities.</p>
        </div>
        <div className="mt-14 border-t border-white/15">
          {frontiers.map(([number, title, body, Icon, href]) => (
            <Link key={number} href={href} className="group grid gap-5 border-b border-white/10 py-7 transition-colors hover:border-[#c9a227]/45 sm:grid-cols-[70px_44px_1fr_auto] sm:items-center">
              <span className="spatial-index text-[10px] text-[#d8b84f]">{number} / MSR</span>
              <Icon aria-hidden="true" className="text-[#c9a227]" size={22} strokeWidth={1.3}/>
              <span><span className="font-display block text-xl font-light text-white sm:text-2xl">{title}</span><span className="mt-2 block max-w-2xl text-sm leading-7 text-white/45">{body}</span></span>
              <ArrowUpRight aria-hidden="true" className="text-white/35 transition group-hover:text-[#e1c46b]" size={18}/>
            </Link>
          ))}
        </div>
        <Link href="/research" className="btn-quiet mt-8">View research areas <ArrowUpRight size={15}/></Link>
      </div>
    </section>

    <section className="section-space">
      <div className="container-shell grid items-center gap-14 md:grid-cols-[1.05fr_.95fr]">
        <div className="spatial-orientation relative flex min-h-[350px] items-center justify-center overflow-hidden md:min-h-[440px]">
          <div aria-hidden="true" className="spatial-orbit spatial-orbit-a"/>
          <div aria-hidden="true" className="spatial-orbit spatial-orbit-b"/>
          <div aria-hidden="true" className="spatial-axis spatial-axis-a"/>
          <div aria-hidden="true" className="spatial-axis spatial-axis-b"/>
          <div aria-hidden="true" className="spatial-core"/>
          <span className="spatial-index absolute bottom-6 left-6 text-[9px] text-white/45">SYSTEMS / 02.01</span>
          <span className="spatial-index absolute right-6 top-6 text-[9px] text-[#d8b84f]/65">RESEARCH → ENGINEERING</span>
        </div>
        <div>
          <SectionHeading eyebrow="03 / Technology" title="From abstract questions to engineered systems." body="We examine how robust software, computational methods and carefully designed infrastructure can turn complex ideas into useful systems."/>
          <Link href="/technology" className="btn-gold mt-8">Explore technology <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>

    <section className="section-space border-y border-white/10 bg-[#0b0d10]">
      <div className="container-shell grid gap-14 md:grid-cols-[1fr_.8fr] md:items-center">
        <div>
          <SectionHeading eyebrow="04 / Intelligence" title="Evidence before assertion. Clarity before conclusion." body="A developing editorial space for research notes, analytical perspectives and considered institutional commentary."/>
          <Link href="/intelligence" className="btn-quiet mt-7">Enter Intelligence <ArrowUpRight size={15}/></Link>
        </div>
        <div className="border-l border-[#c9a227]/45 py-5 pl-7 md:pl-10">
          <Microscope className="text-[#c9a227]" size={24} strokeWidth={1.3}/>
          <p className="font-display mt-8 max-w-sm text-2xl font-light leading-9 text-white/85">Ideas deserve careful examination before they become conclusions.</p>
          <span className="mt-8 block text-[10px] uppercase tracking-[.2em] text-white/35">Research-led perspectives</span>
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="container-shell grid items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div className="relative min-h-[320px] overflow-hidden border border-[#c9a227]/20 bg-[radial-gradient(ellipse_at_55%_45%,rgba(201,162,39,.11),transparent_58%),linear-gradient(145deg,#15191f,#08090b)]">
          <div aria-hidden="true" className="absolute inset-7 border border-[#c9a227]/15"/>
          <div aria-hidden="true" className="absolute inset-[18%] rotate-45 border border-[#c9a227]/20"/>
          <div aria-hidden="true" className="absolute inset-[27%] -rotate-12 rounded-full border border-[#c9a227]/35"/>
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e1c46b] shadow-[0_0_40px_12px_rgba(201,162,39,.3)]"/>
          <span className="spatial-index absolute bottom-6 left-6 text-[9px] text-white/45">INSTITUTIONAL DIRECTION / 03</span>
        </div>
        <div className="max-w-2xl">
          <div className="eyebrow">05 / Institutional leadership</div>
          <h2 className="font-display mt-5 text-3xl font-light tracking-[-.045em] text-white sm:text-4xl">An institution built with a long view.</h2>
          <p className="mt-5 text-sm leading-8 text-white/55">Ira Dev is the owner of MidShaSum Research. Her vision is to develop the institution around disciplined inquiry, independent thinking and the exploration of emerging possibilities.</p>
          <Link href="/ira-dev" className="btn-quiet mt-5">Meet Ira Dev, Owner <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,162,39,.09),transparent_55%)]"/>
      <div className="container-shell relative text-center">
        <div className="eyebrow">06 / Institutional outlook</div>
        <h2 className="font-display mx-auto mt-7 max-w-4xl text-4xl font-light leading-tight tracking-[-.05em] text-white sm:text-5xl md:text-7xl">Beyond the Known.<br/><span className="text-[#d8b84f]">By Design.</span></h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50">Independent thought. Disciplined exploration. A commitment to investigating what comes next.</p>
        <Link href="/contact" className="btn-gold mt-9">Contact MidShaSum <ArrowUpRight size={15}/></Link>
      </div>
    </section>
  </>;
}
