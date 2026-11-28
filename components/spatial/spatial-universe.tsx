"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, Mail, Handshake, Lightbulb } from "lucide-react";
import { SpatialExperienceCanvas } from "@/components/spatial/spatial-canvas";
import { SpatialErrorBoundary, SpatialViewport } from "@/components/spatial/spatial-viewport";
import { ResearchFrontiers } from "@/components/spatial/research-frontiers";
import { MethodologySpatial } from "@/components/spatial/methodology-spatial";
import { SpatialNavRail } from "@/components/spatial/spatial-nav-rail";
import { intelligenceArticles } from "@/lib/intelligence";

const spatialChapters = [
  {
    id: "section-arrival",
    environment: "core" as const,
    index: "01 / 05",
    eyebrow: "Chapter 01 · Institutional Core",
    title: "MIDSHASUM RESEARCH",
    body: "An independent research and technology institution exploring quantitative inquiry, financial technology and intelligent systems through disciplined investigation.",
    primary: { label: "Enter the institution", href: "#section-research-dimensions" },
    secondary: { label: "Explore frontiers", href: "#section-frontiers" }
  },
  {
    id: "section-research-dimensions",
    environment: "research" as const,
    index: "02 / 05",
    eyebrow: "Chapter 02 · Research Dimensions",
    title: "Complex questions live between disciplines.",
    body: "Quantitative methods, financial markets, statistical research and scientific investigation form an interconnected installation — where evidence is examined across boundaries rather than in isolation.",
    primary: { label: "Research scope", href: "/research" },
    secondary: { label: "Institutional philosophy", href: "/about" }
  },
  {
    id: "section-technology-architecture",
    environment: "architecture" as const,
    index: "03 / 05",
    eyebrow: "Chapter 03 · Technology Architecture",
    title: "Engineered for clarity, built for inquiry.",
    body: "Layered engineering assemblies, deterministic pipelines and computational frameworks — technology developed as a precise instrument for reproducible research.",
    primary: { label: "Explore technology", href: "/technology" }
  },
  {
    id: "section-intelligence-space",
    environment: "intelligence" as const,
    index: "04 / 05",
    eyebrow: "Chapter 04 · Intelligence Space",
    title: "Find the signal in connected ideas.",
    body: "Structured analytical strata and weighted signal pathways model how empirical data, context and uncertainty align across depth.",
    primary: { label: "Enter Intelligence", href: "/intelligence" }
  },
  {
    id: "section-institutional-outlook",
    environment: "outlook" as const,
    index: "05 / 05",
    eyebrow: "Chapter 05 · Institutional Outlook",
    title: "Beyond the Known. By Design.",
    body: "MidShaSum Research is being developed around independent thought, disciplined exploration and a long view on the questions still taking shape.",
    primary: { label: "Institutional enquiries", href: "/contact" },
    secondary: { label: "Virtual spokesperson · Ira Dev", href: "/ira-dev" }
  }
];

export function SpatialUniverse() {
  const journey = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);

  useEffect(() => {
    const updateQuality = () => setCompact(window.innerWidth < 768);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionPreference.matches);
    const element = journey.current;
    let observer: IntersectionObserver | undefined;

    updateQuality();
    updateMotion();

    if (element && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => setSceneVisible(entry.isIntersecting),
        { rootMargin: "200px" }
      );
      observer.observe(element);
    } else {
      setSceneVisible(true);
    }

    window.addEventListener("resize", updateQuality, { passive: true });
    motionPreference.addEventListener("change", updateMotion);
    return () => {
      window.removeEventListener("resize", updateQuality);
      motionPreference.removeEventListener("change", updateMotion);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="relative bg-[#080808] text-[#f7f7f5]">
      <SpatialNavRail />

      {/* ─── 5-CHAPTER CONTINUOUS SPATIAL JOURNEY ─── */}
      <section
        ref={journey}
        id="section-arrival"
        className="spatial-universe relative isolate"
        aria-label="MidShaSum Research five-chapter spatial journey"
        data-testid="spatial-universe"
      >
        <div className="spatial-universe__sticky sticky top-16 z-0 -mb-[calc(100svh-64px)] h-[calc(100svh-64px)] min-h-[570px] overflow-hidden lg:top-0 lg:-mb-[100svh] lg:h-[100svh]">
          <div className="spatial-universe__fallback absolute inset-0" aria-hidden="true" />
          {sceneVisible && !reducedMotion && (
            <SpatialErrorBoundary>
              <SpatialExperienceCanvas
                compact={compact}
                progressRef={journey}
                evidence
              />
            </SpatialErrorBoundary>
          )}
          <div className="spatial-universe__vignette absolute inset-0 pointer-events-none" />
          <div className="spatial-universe__coords absolute bottom-7 right-7 hidden text-right font-mono text-[9px] uppercase tracking-[.2em] text-white/40 md:block">
            <div>M S R / SPATIAL CORE</div>
            <div className="mt-2 text-[#c9a227]/75">FIELD STUDY / 001</div>
          </div>
          <div className="spatial-universe__vertical-label absolute right-8 top-10 hidden font-mono text-[8px] uppercase tracking-[.24em] text-white/35 [writing-mode:vertical-rl] lg:block">
            ARCHITECTURE OF INQUIRY · 2026
          </div>
        </div>

        <div className="spatial-universe__chapters relative z-10">
          {spatialChapters.map((chapter, index) => {
            const isOpening = index === 0;
            const isOutlook = index === spatialChapters.length - 1;
            const headingClass = `font-display mt-5 font-light leading-[1.08] tracking-[-.05em] text-[#f7f7f5] ${
              isOpening
                ? "max-w-[650px] text-[clamp(2.6rem,6.6vw,5.8rem)]"
                : "max-w-[560px] text-3xl sm:text-5xl lg:text-[3.25rem]"
            }`;
            const heading = isOpening ? (
              <>
                Beyond the <span className="text-[#e1c46b]">Known.</span>
                <br />
                By Design.
              </>
            ) : (
              chapter.title
            );

            return (
              <article
                key={chapter.environment}
                id={index === 0 ? undefined : chapter.id}
                className={`spatial-chapter container-shell flex min-h-[100svh] items-center ${
                  isOpening ? "spatial-chapter--opening" : ""
                } ${isOutlook ? "spatial-chapter--outlook" : ""}`}
                data-spatial-chapter={chapter.environment}
              >
                <div
                  className={`spatial-chapter__content max-w-[min(100%,610px)] ${
                    isOpening ? "pt-5 md:pt-0" : "py-24 md:py-28"
                  }`}
                >
                  <p className="eyebrow">{chapter.eyebrow}</p>
                  <p className="mt-4 font-mono text-[9px] tracking-[.25em] text-white/35">
                    {chapter.index} <span className="px-2 text-[#c9a227]/70">/</span> MIDSHASUM RESEARCH
                  </p>
                  {isOpening && (
                    <p className="font-display mt-7 text-[11px] font-medium tracking-[.32em] text-white/70 sm:text-xs">
                      MIDSHASUM RESEARCH
                    </p>
                  )}
                  {isOpening ? (
                    <h1 className={headingClass}>{heading}</h1>
                  ) : (
                    <h2 className={headingClass}>{heading}</h2>
                  )}
                  <p className="mt-6 max-w-[500px] text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                    {chapter.body}
                  </p>
                  {(chapter.primary || chapter.secondary) && (
                    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                      {chapter.primary && (
                        chapter.primary.href.startsWith("#") ? (
                          <a href={chapter.primary.href} className="btn-gold">
                            {chapter.primary.label} <ArrowDown aria-hidden="true" size={15} />
                          </a>
                        ) : (
                          <Link href={chapter.primary.href} className="btn-gold">
                            {chapter.primary.label} <ArrowUpRight aria-hidden="true" size={15} />
                          </Link>
                        )
                      )}
                      {chapter.secondary && (
                        chapter.secondary.href.startsWith("#") ? (
                          <a href={chapter.secondary.href} className="btn-quiet">
                            {chapter.secondary.label} <ArrowUpRight aria-hidden="true" size={15} />
                          </a>
                        ) : (
                          <Link href={chapter.secondary.href} className="btn-quiet">
                            {chapter.secondary.label} <ArrowUpRight aria-hidden="true" size={15} />
                          </Link>
                        )
                      )}
                    </div>
                  )}
                  {isOpening && (
                    <a
                      href="#section-research-dimensions"
                      className="mt-12 inline-flex items-center gap-3 font-mono text-[9px] tracking-[.23em] text-white/40 transition-colors hover:text-[#e1c46b]"
                    >
                      <ArrowDown aria-hidden="true" size={13} /> SCROLL TO EXPLORE
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div aria-hidden="true" className="spatial-universe__endcap h-[18svh]" />
      </section>

      {/* ─── RESEARCH FRONTIERS (OBSIDIANUI PARALLAX SLIDER) ─── */}
      <ResearchFrontiers />

      {/* ─── RESEARCH METHODOLOGY (SPATIAL PROCESS VISUALISATION) ─── */}
      <MethodologySpatial />

      {/* ─── INSIGHTS AND PUBLICATIONS ─── */}
      <section
        id="section-insights"
        data-spatial-section="insights"
        className="border-b border-white/10 bg-[#101216]/60 py-24 md:py-32"
      >
        <div className="container-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Insights &amp; Publications</p>
            <h2 className="font-display mt-5 text-3xl font-light leading-tight tracking-[-.045em] text-[#f7f7f5] sm:text-5xl">
              A considered record, not a content feed.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              The MidShaSum Research Intelligence library is structured for research articles, institutional perspectives, technical insights and emerging technology analysis.
            </p>
            <Link href="/intelligence" className="btn-quiet mt-8">
              Open Intelligence library <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="glass-card p-8 md:p-10">
            {intelligenceArticles.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {intelligenceArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/intelligence/${article.slug}`}
                    className="glass-card-interactive group block p-6"
                  >
                    <span className="eyebrow">{article.category}</span>
                    <h3 className="font-display mt-3 text-xl font-light text-white group-hover:text-[#e1c46b]">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-white/55">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-5">
                <BookOpen className="mt-1 shrink-0 text-[#c9a227]" size={24} aria-hidden="true" />
                <div>
                  <div className="eyebrow">Editorial Programme</div>
                  <h3 className="font-display mt-4 text-2xl font-light text-white">
                    No publications yet.
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-8 text-white/55">
                    Research notes, technical insights and institutional perspectives will be published here only after factual and editorial review. No unverified findings or fabricated publications are presented.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-[#e1c46b]">
                    <span>Research Articles</span>
                    <span className="text-white/25">·</span>
                    <span>Institutional Perspectives</span>
                    <span className="text-white/25">·</span>
                    <span>Technical Insights</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── CONTACT AND INSTITUTIONAL ENQUIRIES ─── */}
      <section
        id="section-contact"
        data-spatial-section="contact"
        className="spatial-hero relative isolate overflow-hidden bg-[#080808] py-24 md:py-32"
      >
        <SpatialViewport variant="contact" />
        <div className="container-shell relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow">Institutional Enquiries</p>
            <h2 className="font-display mt-6 text-4xl font-light leading-[1.1] tracking-[-.05em] text-white sm:text-6xl">
              Beyond the Known.
              <br />
              <span className="text-[#e1c46b]">By Design.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/60 sm:text-base">
              MidShaSum Research welcomes considered enquiries relating to research collaboration, technology partnerships, licensing and institutional relationships.
            </p>
          </div>

          <div className="glass-card-elevated mt-12 grid gap-0 md:grid-cols-3">
            <div className="border-b border-white/10 p-7 md:border-b-0">
              <Mail className="text-[#c9a227]" size={20} aria-hidden="true" />
              <h3 className="font-display mt-5 text-lg text-white">Institutional enquiries</h3>
              <p className="mt-2 text-sm leading-7 text-white/50">General enquiries and institutional introductions.</p>
            </div>
            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-l md:border-white/10">
              <Handshake className="text-[#c9a227]" size={20} aria-hidden="true" />
              <h3 className="font-display mt-5 text-lg text-white">Partnerships</h3>
              <p className="mt-2 text-sm leading-7 text-white/50">Technology, research and strategic collaborations.</p>
            </div>
            <div className="p-7 md:border-l md:border-white/10">
              <Lightbulb className="text-[#c9a227]" size={20} aria-hidden="true" />
              <h3 className="font-display mt-5 text-lg text-white">Licensing &amp; projects</h3>
              <p className="mt-2 text-sm leading-7 text-white/50">Discuss potential technology licensing and project scope.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-gold">
              Open enquiry form <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/ira-dev" className="btn-quiet">
              Virtual spokesperson · Ira Dev <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
