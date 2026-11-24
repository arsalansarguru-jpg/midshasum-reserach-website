export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="max-w-3xl"><div className="eyebrow">{eyebrow}</div><h2 className="font-display mt-5 text-3xl font-light leading-tight tracking-[-.04em] text-white md:text-5xl">{title}</h2>{body && <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 md:text-base">{body}</p>}</div>;
}
