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
    <div className="container-shell relative z-10"><div className="eyebrow">{eyebrow}</div><h1 className="type-page mt-7 max-w-2xl text-white">{title}</h1><p className="type-body mt-8 max-w-xl text-white/65">{body}</p></div>
  </section>;
}
