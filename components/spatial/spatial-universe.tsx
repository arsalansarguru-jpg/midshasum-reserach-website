"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SpatialExperienceCanvas, type SpatialEnvironment } from "@/components/spatial/spatial-canvas";
import { SpatialErrorBoundary } from "@/components/spatial/spatial-viewport";

const chapters: Array<{
  environment: SpatialEnvironment;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}> = [
  {
    environment: "core",
    index: "01 / 05",
    eyebrow: "Institutional core",
    title: "MIDSHASUM RESEARCH",
    body: "Exploring the frontiers of research, intelligence and technology through systematic inquiry, engineered thinking and purposeful innovation.",
    primary: { label: "Explore our research", href: "/research" },
    secondary: { label: "Discover MidShaSum", href: "/about" }
  },
  {
    environment: "research",
    index: "02 / 05",
    eyebrow: "Research dimensions",
    title: "Complex questions live between disciplines.",
    body: "A navigable constellation connects quantitative methods, market structure and independent inquiry. Each node marks a different perspective; the lines show questions that cross between them.",
    primary: { label: "Research approach", href: "/research" }
  },
  {
    environment: "architecture",
    index: "03 / 05",
    eyebrow: "Technology architecture",
    title: "Engineered for clarity, built for inquiry.",
    body: "A structural study in layers, alignment and repeatable systems—technology explored as an instrument for research, not an end in itself.",
    primary: { label: "Explore technology", href: "/technology" }
  },
  {
    environment: "intelligence",
    index: "04 / 05",
    eyebrow: "Intelligence space",
    title: "Find the signal in connected ideas.",
    body: "Information, context and analytical thinking form a wider field of relationships. Understanding grows when evidence is examined in connection, with uncertainty kept in view.",
    primary: { label: "Enter Intelligence", href: "/intelligence" }
  },
  {
    environment: "outlook",
    index: "05 / 05",
    eyebrow: "Institutional outlook",
    title: "Beyond the Known. By Design.",
    body: "Under the ownership of Ira Dev, MidShaSum Research is being developed around independent thought, disciplined exploration and a long view on the questions still taking shape.",
    primary: { label: "Contact MidShaSum", href: "/contact" },
    secondary: { label: "Meet Ira Dev, Owner", href: "/ira-dev" }
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
    <section
      ref={journey}
      className="spatial-universe relative isolate"
      aria-label="MidShaSum Research spatial journey"
      data-testid="spatial-universe"
    >
      <div className="spatial-universe__sticky sticky top-[76px] z-0 -mb-[calc(100svh-76px)] h-[calc(100svh-76px)] min-h-[570px] overflow-hidden">
        <div className="spatial-universe__fallback absolute inset-0" aria-hidden="true"/>
        {sceneVisible && !reducedMotion && (
          <SpatialErrorBoundary>
            <SpatialExperienceCanvas
              compact={compact}
              progressRef={journey}
              evidence
            />
          </SpatialErrorBoundary>
        )}
        <div className="spatial-universe__vignette absolute inset-0 pointer-events-none"/>
        <div className="spatial-universe__coords absolute bottom-7 right-7 hidden text-right font-mono text-[9px] uppercase tracking-[.2em] text-white/40 md:block">
          <div>M S R / SPATIAL CORE</div>
          <div className="mt-2 text-[#d0ae62]/70">FIELD STUDY / 001</div>
        </div>
        <div className="spatial-universe__vertical-label absolute right-8 top-10 hidden font-mono text-[8px] uppercase tracking-[.24em] text-white/35 [writing-mode:vertical-rl] lg:block">
          ARCHITECTURE OF INQUIRY · 2026
        </div>
      </div>

      <div className="spatial-universe__chapters relative z-10">
        {chapters.map((chapter, index) => {
          const headingClass = `font-display mt-6 font-light leading-[1.06] tracking-[-.06em] text-white ${index === 0 ? "max-w-[660px] text-[clamp(2.8rem,7.4vw,6.6rem)]" : "max-w-[570px] text-4xl sm:text-5xl lg:text-6xl"}`;
          const heading = index === 0
            ? <>Beyond the <span className="text-[#d6b866]">Known.</span><br/>By Design.</>
            : chapter.title;
          return (
            <article
              key={chapter.environment}
              className={`spatial-chapter container-shell flex min-h-[100svh] items-center ${index === 0 ? "spatial-chapter--opening" : ""} ${index === chapters.length - 1 ? "spatial-chapter--outlook" : ""}`}
              data-spatial-chapter={chapter.environment}
            >
              <div className={`spatial-chapter__content max-w-[min(100%,650px)] ${index === 0 ? "pt-5 md:pt-0" : "py-24 md:py-28"}`}>
                <p className="eyebrow">{chapter.eyebrow}</p>
                <p className="mt-5 font-mono text-[9px] tracking-[.27em] text-white/35">{chapter.index} <span className="px-2 text-[#d0ae62]/70">/</span> MIDSHASUM RESEARCH</p>
                {index === 0 && <p className="font-display mt-9 text-[10px] font-medium tracking-[.34em] text-white/60 sm:text-xs">MIDSHASUM RESEARCH</p>}
                {index === 0
                  ? <h1 className={headingClass}>{heading}</h1>
                  : <h2 className={headingClass}>{heading}</h2>}
                <p className="mt-7 max-w-[510px] text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                  {chapter.body}
                </p>
                {(chapter.primary || chapter.secondary) && (
                  <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                    {chapter.primary && (
                      <Link href={chapter.primary.href} className="btn-gold">
                        {chapter.primary.label}<ArrowUpRight aria-hidden="true" size={15}/>
                      </Link>
                    )}
                    {chapter.secondary && (
                      <Link href={chapter.secondary.href} className="btn-quiet">
                        {chapter.secondary.label}<ArrowUpRight aria-hidden="true" size={15}/>
                      </Link>
                    )}
                  </div>
                )}
                {index === 0 && (
                  <a href="#spatial-chapter-research" className="mt-14 inline-flex items-center gap-3 font-mono text-[9px] tracking-[.23em] text-white/40 transition-colors hover:text-[#d6b866]">
                    <ArrowDown aria-hidden="true" size={13}/> SCROLL TO EXPLORE
                  </a>
                )}
              </div>
              <span id={index === 1 ? "spatial-chapter-research" : undefined} className="sr-only">
                Spatial environment: {chapter.environment}
              </span>
            </article>
          );
        })}
      </div>
      <div aria-hidden="true" className="spatial-universe__endcap h-[30svh]"/>
    </section>
  );
}
