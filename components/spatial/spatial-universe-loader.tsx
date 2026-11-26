"use client";

import dynamic from "next/dynamic";

const SpatialUniverse = dynamic(
  () => import("@/components/spatial/spatial-universe").then((module) => module.SpatialUniverse),
  { ssr: false, loading: () => <div className="spatial-universe-loading min-h-[500svh]" aria-hidden="true"/> }
);

export function SpatialUniverseLoader() {
  return <SpatialUniverse/>;
}
