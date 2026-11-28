import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export function FeatureCard({ number, title, body, icon: Icon }: { number: string; title: string; body: string; icon: LucideIcon }) {
  return (
    <article className="glass-card-interactive group p-7 md:p-8">
      <div className="flex items-start justify-between">
        <Icon className="text-[#c9a227]" size={23} strokeWidth={1.3} />
        <span className="font-mono text-[10px] tracking-[.18em] text-white/35">{number}</span>
      </div>
      <h3 className="type-card mt-12 font-medium text-white">{title}</h3>
      <p className="type-body-sm mt-4 text-white/55">{body}</p>
      <div className="mt-8 flex justify-end text-white/25 transition group-hover:text-[#e1c46b]">
        <ArrowUpRight size={18} />
      </div>
    </article>
  );
}
