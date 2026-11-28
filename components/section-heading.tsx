export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="max-w-3xl"><div className="eyebrow">{eyebrow}</div><h2 className="type-section mt-5 text-white">{title}</h2>{body && <p className="type-body mt-6 max-w-2xl text-white/55">{body}</p>}</div>;
}
