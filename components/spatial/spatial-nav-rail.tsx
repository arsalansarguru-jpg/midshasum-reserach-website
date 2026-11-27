"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SECTIONS = [
  { id: "section-arrival", code: "01", label: "Core" },
  { id: "section-research-dimensions", code: "02", label: "Dimensions" },
  { id: "section-technology-architecture", code: "03", label: "Architecture" },
  { id: "section-intelligence-space", code: "04", label: "Intelligence" },
  { id: "section-institutional-outlook", code: "05", label: "Outlook" },
  { id: "section-frontiers", code: "06", label: "Frontiers" },
  { id: "section-methodology", code: "07", label: "Methodology" },
  { id: "section-insights", code: "08", label: "Insights" },
  { id: "section-contact", code: "09", label: "Enquiries" }
] as const;

export function SpatialNavRail() {
  const [activeId, setActiveId] = useState<string>("section-arrival");

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Spatial section navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 2xl:flex"
    >
      <div className="border border-white/10 bg-[#080808]/85 px-2.5 py-3 backdrop-blur-md">
        <ul className="space-y-1.5">
          {SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group flex items-center justify-end gap-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[.18em] transition-colors ${
                    isActive ? "text-[#e1c46b]" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span className={isActive ? "opacity-100" : "opacity-0 transition-opacity group-hover:opacity-100"}>
                    {sec.label}
                  </span>
                  <span className="tabular-nums">{sec.code}</span>
                  <span
                    className={`h-px transition-all ${
                      isActive ? "w-5 bg-[#c9a227]" : "w-2 bg-white/25 group-hover:w-3.5"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#section-arrival"
          aria-label="Return to top"
          className="mt-3 flex items-center justify-center border-t border-white/10 pt-2.5 text-white/45 transition-colors hover:text-[#e1c46b]"
        >
          <ArrowUp size={12} />
        </a>
      </div>
    </nav>
  );
}
