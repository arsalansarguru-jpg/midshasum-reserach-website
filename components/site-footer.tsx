import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060709] text-[#F2F0E9]">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-primary.webp"
            alt="MidShaSum Research"
            width={250}
            height={125}
            unoptimized
            className="h-auto w-44"
          />
          <p className="mt-4 font-display text-sm tracking-[.04em] text-[#E1C46B]">
            Beyond the Known. By Design.
          </p>
          <p className="type-body-sm mt-4 max-w-sm text-[#858B95]">
            An independent research and technology institution exploring quantitative inquiry, financial technology and intelligent systems.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-5">Institution</div>
          <ul className="grid gap-3 text-sm text-[#F2F0E9]/70">
            <li><Link href="/about" className="hover:text-[#E1C46B]">About</Link></li>
            <li><Link href="/research" className="hover:text-[#E1C46B]">Research</Link></li>
            <li><Link href="/technology" className="hover:text-[#E1C46B]">Technology</Link></li>
            <li><Link href="/intelligence" className="hover:text-[#E1C46B]">Intelligence</Link></li>
            <li><Link href="/ira-dev" className="hover:text-[#E1C46B]">Ira Dev</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-5">Enquiries &amp; Governance</div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-[#F2F0E9]/85 hover:text-[#E1C46B]"
          >
            Institutional enquiries <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <ul className="mt-8 grid gap-3 text-xs text-[#858B95]">
            <li><Link href="/privacy" className="hover:text-[#F2F0E9]">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#F2F0E9]">Terms of use</Link></li>
            <li><Link href="/disclosures" className="hover:text-[#F2F0E9]">Risk &amp; regulatory disclosures</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-shell flex flex-col justify-between gap-3 border-t border-white/10 py-6 font-mono text-[10px] tracking-[.14em] text-[#858B95] md:flex-row">
        <span>© {new Date().getFullYear()} MidShaSum Research. All rights reserved.</span>
        <span>Independent thought · Disciplined exploration</span>
      </div>
    </footer>
  );
}
