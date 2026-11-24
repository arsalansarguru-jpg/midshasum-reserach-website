export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <section className="relative overflow-hidden border-b border-white/10 py-28 md:py-36">
    <div className="grid-glow absolute inset-0 opacity-60"/>
    <div className="container-shell relative"><div className="eyebrow">{eyebrow}</div><h1 className="font-display mt-7 max-w-5xl text-4xl font-light leading-[1.12] tracking-[-.05em] text-white md:text-7xl">{title}</h1><p className="mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">{body}</p></div>
  </section>;
}
