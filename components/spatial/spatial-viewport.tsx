"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";

type SpatialVariant = "institution" | "research" | "technology" | "intelligence" | "profile" | "contact" | "legal";

const SpatialCanvas = dynamic(() => import("@/components/spatial/spatial-canvas"), {
  ssr: false,
  loading: () => null
});

export class SpatialErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("The spatial scene could not be rendered; using the static backdrop.", error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export function SpatialViewport({
  variant = "institution",
  className = ""
}: {
  variant?: SpatialVariant;
  className?: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [compact, setCompact] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    const updateQuality = () => setCompact(window.innerWidth < 768);
    updateQuality();
    window.addEventListener("resize", updateQuality, { passive: true });

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setActive(entry.isIntersecting);
        },
        { rootMargin: "160px" }
      );
      observer.observe(element);
    } else {
      setActive(true);
    }

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("resize", updateQuality);
    };
  }, []);

  return (
    <div
      ref={viewport}
      className={`spatial-viewport ${className}`}
      aria-hidden="true"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--pointer-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2}`
        );
        event.currentTarget.style.setProperty(
          "--pointer-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 2}`
        );
      }}
    >
      <div className={`spatial-fallback spatial-fallback-${variant}`} />
      {active && !reducedMotion && (
        <SpatialErrorBoundary>
          <SpatialCanvas variant={variant} compact={compact} />
        </SpatialErrorBoundary>
      )}
    </div>
  );
}
