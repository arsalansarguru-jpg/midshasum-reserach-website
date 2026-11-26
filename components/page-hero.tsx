import { SpatialViewport } from "@/components/spatial/spatial-viewport";

type SpatialVariant = "institution" | "research" | "technology" | "intelligence" | "profile" | "contact" | "legal";

export function PageHero({ eyebrow, title, body, scene = "institution" }: {
  eyebrow: string;
  title: string;
  body: string;
  scene?: SpatialVariant;
}) {
  return <section className="spatial-hero relative isolate overflow-hidden border-b border-white/10 py-28 md:py-36">
    <SpatialViewport variant={scene}/>
    <div className="grid-glow absolute inset-0 opacity-60"/>
    <div className="container-shell relative z-10"><div className="eyebrow">{eyebrow}</div><h1 className="font-display mt-7 max-w-5xl text-4xl font-light leading-[1.12] tracking-[-.05em] text-white md:text-7xl">{title}</h1><p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg">{body}</p></div>
  </section>;
}
