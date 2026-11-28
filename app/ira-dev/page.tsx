import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SpatialViewport } from "@/components/spatial/spatial-viewport";

export const metadata: Metadata = {
  title: "Ira Dev, Virtual Executive & Brand Spokesperson",
  description:
    "Ira Dev is MidShaSum Research's fictional, AI-generated virtual executive and brand spokesperson, representing the institution across its research, technology and intelligence communications.",
  alternates: { canonical: "/ira-dev" },
  openGraph: {
    title: "Ira Dev | Virtual Executive & Brand Spokesperson, MidShaSum Research",
    description:
      "Ira Dev is MidShaSum Research's fictional, AI-generated virtual executive and brand spokesperson.",
    url: "https://midshasumresearch.com/ira-dev",
    images: [
      {
        url: "/ira-dev/ira-dev-executive.webp",
        width: 1671,
        height: 941,
        alt: "Ira Dev, MidShaSum Research's fictional AI-generated virtual executive and brand spokesperson"
      }
    ]
  }
};

const biography = [
  {
    title: "An institutional voice for independent research",
    paragraphs: [
      "Ira Dev serves as the institutional brand spokesperson and representative voice of MidShaSum Research. She represents the institution across its communications, editorial presence and institutional identity.",
      "Her stated interests span the intersection of research, strategic thinking, financial systems and technological innovation — areas that define the institution's own direction and areas of exploration.",
      "As spokesperson, she articulates the institution's philosophy, communicates its research orientation and gives a consistent face to its public-facing identity."
    ]
  },
  {
    title: "A broader perspective",
    paragraphs: [
      "MidShaSum Research sees the future of research increasingly taking shape at the intersection of disciplines. Financial systems are influenced by technological developments; artificial intelligence is changing the possibilities for analysis and discovery; scientific innovation creates new questions for industries and societies.",
      "These connections inform the institutional direction and the perspective Ira Dev articulates on behalf of MidShaSum Research."
    ]
  },
  {
    title: "Institutional representation",
    paragraphs: [
      "Ira Dev is an AI-generated institutional representative and brand identity. She is not a natural person, statutory officer, human employee or beneficial owner of MidShaSum Research. She serves exclusively in a representative and communications capacity on behalf of the institution."
    ]
  },
];

const areasOfInterest = [
  "Strategic research and independent investigation",
  "Financial markets, investment systems and quantitative analysis",
  "Artificial intelligence and emerging technologies",
  "Economics, international developments and global affairs",
  "Scientific discovery and interdisciplinary innovation",
  "Institutional development and the future of research organisations",
];

const visionPriorities = [
  ["Research excellence", "Encouraging structured investigation, independent analysis and intellectual rigour."],
  ["Financial intelligence", "Exploring quantitative approaches and developments across financial systems."],
  ["Technological advancement", "Examining emerging technologies and their practical implications."],
  ["Interdisciplinary exploration", "Connecting ideas and developments across different fields."],
  ["Institutional credibility", "Building a reputation through consistency, transparency and the quality of its work."],
  ["Global perspective", "Engaging with developments, ideas and opportunities beyond geographical boundaries."],
];

const institutionalLinks = [
  ["About", "/about", "Institutional background and philosophy"],
  ["Research", "/research", "Research areas and approach"],
  ["Technology", "/technology", "Technology and systems"],
  ["Intelligence", "/intelligence", "Research notes and perspectives"],
  ["Contact", "/contact", "Institutional enquiries"],
];

export default function IraDevPage() {
  return (
    <div className="ira-profile">
      <noscript>
        <style>{`[data-ira-reveal="true"] { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <section className="ira-profile-hero spatial-hero relative isolate overflow-hidden border-b border-white/10">
        <SpatialViewport variant="profile" />
        <div aria-hidden="true" className="ira-profile-grid absolute inset-0 -z-10" />
        <div className="container-shell relative grid min-h-[calc(100svh-76px)] items-center gap-12 py-16 md:grid-cols-[.9fr_1.1fr] md:gap-10 md:py-20 lg:gap-16">
          <div className="relative z-10 py-4 md:py-10">
            <Reveal>
              <p className="eyebrow">Institutional representation</p>
              <p className="mt-8 font-display text-sm uppercase tracking-[.25em] text-white/55">
                MidShaSum Research
              </p>
              <h1 className="font-display mt-3 text-5xl font-light tracking-[-.065em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Ira Dev<span className="text-[#d1ae49]">.</span>
              </h1>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[.22em] text-[#e1c46b] sm:text-sm">
                Virtual Executive &amp; Brand Spokesperson <span className="px-2 text-white/40">|</span> AI-Generated Representative
              </p>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
                Ira Dev is MidShaSum Research&apos;s fictional, AI-generated virtual executive and brand spokesperson, articulating the institution&apos;s research philosophy, strategic direction and intellectual identity.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
                She brings together the institution&apos;s interests in strategic research, financial intelligence, technological advancement and independent thinking — communicating them with a consistent and considered perspective.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="#profile" className="btn-gold">
                  Explore the profile <ArrowDown aria-hidden="true" size={15} />
                </Link>
                <Link href="/about" className="btn-quiet">
                  About the institution <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="ira-portrait-reveal relative mx-auto w-full max-w-[740px] md:my-8">
            <figure className="ira-portrait-frame relative aspect-[.88] overflow-hidden bg-[#10151b] sm:aspect-[1.05] md:aspect-[.8] lg:aspect-[.88]">
              <Image
                src="/ira-dev/ira-dev-executive.webp"
                alt="Ira Dev, institutional spokesperson of MidShaSum Research"
                fill
                priority
                quality={88}
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 48vw, 560px"
                className="ira-portrait-image object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#090d12]/95 via-[#090d12]/55 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
                <span className="text-[10px] font-medium uppercase tracking-[.2em] text-white/75">
                  Ira Dev · Brand Spokesperson, MidShaSum Research
                </span>
                <span aria-hidden="true" className="h-px w-12 shrink-0 bg-[#d1ae49]" />
              </figcaption>
            </figure>
            <div aria-hidden="true" className="ira-frame-coordinate ira-frame-coordinate-top">MSR / 01</div>
            <div aria-hidden="true" className="ira-frame-coordinate ira-frame-coordinate-bottom">Beyond the known</div>
          </Reveal>
        </div>
      </section>

      <nav aria-label="Ira Dev profile sections" className="glass-panel border-x-0 border-b border-white/10">
        <div className="container-shell flex gap-6 overflow-x-auto py-4 text-[10px] uppercase tracking-[.16em] text-white/50 sm:gap-9">
          <Link className="whitespace-nowrap transition-colors hover:text-[#e1c46b]" href="#profile">Profile</Link>
          <Link className="whitespace-nowrap transition-colors hover:text-[#e1c46b]" href="#representation">Representation</Link>
          <Link className="whitespace-nowrap transition-colors hover:text-[#e1c46b]" href="#vision">Vision</Link>
          <Link className="whitespace-nowrap transition-colors hover:text-[#e1c46b]" href="#interests">Areas of interest</Link>
          <Link className="whitespace-nowrap transition-colors hover:text-[#e1c46b]" href="#statement">Statement</Link>
        </div>
      </nav>

      <section id="profile" className="section-space scroll-mt-24">
        <div className="container-shell grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <Reveal>
            <p className="eyebrow">01 / Institutional profile</p>
            <h2 className="font-display mt-6 max-w-xl text-3xl font-light leading-tight tracking-[-.045em] sm:text-4xl lg:text-5xl">
              The Institutional Voice of MidShaSum Research
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              Ira Dev gives consistent, considered expression to MidShaSum Research&apos;s institutional direction, research philosophy and strategic perspective.
            </p>
          </Reveal>
          <div className="border-t border-white/15">
            {biography.map(({ title, paragraphs }, index) => (
              <Reveal key={title} className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[54px_1fr] sm:gap-6 sm:py-7">
                <span className="font-display text-xs tracking-[.18em] text-[#d1ae49]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-light tracking-[-.025em] text-white sm:text-2xl">{title}</h3>
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-sm leading-7 text-white/50">{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="representation" className="section-space scroll-mt-20 border-y border-white/10 bg-[#0c1015]">
        <div className="container-shell grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <Reveal>
            <p className="eyebrow">02 / Role & responsibility</p>
            <h2 className="font-display mt-6 max-w-lg text-3xl font-light leading-tight tracking-[-.045em] sm:text-4xl">
              A Purposeful Representative Identity
            </h2>
          </Reveal>
          <Reveal className="text-sm leading-8 text-white/55 sm:text-base">
            <p>
              MidShaSum Research uses Ira Dev as its institutional brand identity — a consistent spokesperson who articulates the institution&apos;s research orientation, long-term direction and intellectual philosophy across its public communications.
            </p>
            <p className="mt-5">
              Her perspective centres on evidence, clarity, intellectual independence and questioning established assumptions. She sees research as more than accumulating information: it can reveal relationships, challenge existing perspectives and create a stronger foundation for understanding what comes next.
            </p>
            <p className="mt-5 border-l border-[#c9a227] pl-5 text-white/40">
              Ira Dev is an AI-generated representative. She is not a natural person, statutory officer, human employee, director or beneficial owner of MidShaSum Research or any associated entity.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="vision" className="ira-vision relative isolate scroll-mt-20 overflow-hidden border-y border-[#c9a227]/20 bg-[#0c1118] py-24 sm:py-32">
        <div aria-hidden="true" className="ira-vision-grid absolute inset-0 -z-10" />
        <Reveal className="container-shell relative">
          <p className="eyebrow">03 / Vision & philosophy</p>
          <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
            <h2 className="font-display max-w-3xl text-4xl font-light leading-[1.12] tracking-[-.06em] sm:text-5xl lg:text-6xl">
              Beyond the Known.
              <br />
              <span className="text-[#d1ae49]">By Design.</span>
            </h2>
            <div className="max-w-xl">
              <p className="text-sm leading-8 text-white/65 sm:text-base">
                The long-term ambition expressed through Ira Dev&apos;s voice is to build MidShaSum Research into an internationally respected independent research institution, recognised for its intellectual standards, research orientation, technological perspective and commitment to exploring important questions.
              </p>
              <p className="mt-5 text-sm leading-8 text-white/45">
                The ambition is not simply to follow established developments, but to develop the capacity to investigate emerging ones. Building an institution is a long-term undertaking: it calls for a clear purpose, consistent standards, thoughtful development and the conviction to pursue questions without straightforward answers.
              </p>
              <p className="mt-5 text-sm leading-8 text-white/45">
                &ldquo;Beyond the Known. By Design.&rdquo; is more than a motto; it expresses the institutional philosophy that guides MidShaSum Research&apos;s direction.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visionPriorities.map(([title, detail], index) => (
              <div key={title} className="glass-card p-6">
                <p className="font-display text-[10px] tracking-[.15em] text-[#d1ae49]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-3 text-lg font-light text-white">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/55">{detail}</p>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="ira-vision-coordinate mt-14 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[.2em] text-white/35">
            <span>MidShaSum Research</span>
            <span>Beyond the Known. By Design.</span>
          </div>
        </Reveal>
      </section>

      <section id="interests" className="section-space scroll-mt-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">04 / Research & technology</p>
            <h2 className="font-display mt-6 max-w-lg text-3xl font-light leading-tight tracking-[-.045em] sm:text-4xl lg:text-5xl">
              Areas of Interest and Institutional Focus
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              The intellectual interests expressed through Ira Dev span connected fields shaping economies, industries and societies. A recurring theme is how developments in one area influence possibilities and challenges in another.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {areasOfInterest.map((area, index) => (
              <Reveal key={area} className="glass-card-interactive group flex min-h-20 items-center gap-4 p-5">
                <span aria-hidden="true" className="font-display text-[10px] tracking-[.14em] text-[#d1ae49]/75">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm leading-6 text-white/80 transition-colors group-hover:text-white">{area}</h3>
                <ArrowUpRight aria-hidden="true" size={14} className="ml-auto shrink-0 text-white/25 transition-colors group-hover:text-[#d1ae49]" />
              </Reveal>
            ))}
            <p className="pt-2 text-xs leading-6 text-white/45 sm:col-span-2">
              These interests reflect the institutional direction of MidShaSum Research and are expressed through Ira Dev in her representative capacity.
            </p>
          </div>
        </div>
      </section>

      <section id="statement" className="scroll-mt-20 border-y border-white/10 bg-[#0c1015] py-20 sm:py-28">
        <Reveal className="container-shell max-w-4xl text-center">
          <p className="eyebrow">05 / Institutional commitment &amp; transparency</p>
          <h2 className="font-display mt-8 text-3xl font-light leading-tight tracking-[-.04em] text-white sm:text-4xl lg:text-5xl">
            Important questions deserve disciplined inquiry, transparent methods and accountable stewardship.
          </h2>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[.18em] text-[#e1c46b]">
            MidShaSum Research · Institutional Direction
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-white/45">
            Ira Dev is MidShaSum Research&apos;s fictional, AI-generated virtual executive and brand spokesperson. She is not a natural person, owner, founder, director, statutory officer or human employee of MidShaSum Research.
          </p>
        </Reveal>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">MidShaSum Research</p>
            <h2 className="font-display mt-6 text-3xl font-light leading-tight tracking-[-.045em] sm:text-4xl lg:text-5xl">
              A wider mission, expressed through independent leadership.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/50">
              MidShaSum Research pursues a considered exploration of quantitative research, financial technology and intelligent systems. Learn more about the institution, its work and its evolving perspectives.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {institutionalLinks.map(([label, href, detail], index) => (
              <Link
                key={href}
                href={href}
                className="glass-card-interactive group p-5"
              >
                <span className="font-display text-[10px] tracking-[.15em] text-[#d1ae49]">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-3 flex items-center justify-between font-display text-lg font-light text-white/85">
                  {label}
                  <ArrowUpRight aria-hidden="true" size={14} className="text-white/35 transition-colors group-hover:text-[#d1ae49]" />
                </span>
                <span className="mt-2 block text-xs leading-5 text-white/40">{detail}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
