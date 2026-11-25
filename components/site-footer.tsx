import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060708]">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-primary.webp" alt="MidShaSum Research" width={250} height={125} unoptimized className="h-auto w-48"/>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">Beyond the Known. By Design.</p>
          <p className="mt-6 max-w-sm text-xs leading-6 text-white/35">An independent research and technology institution exploring quantitative research, financial technology and intelligent systems.</p>
        </div>
        <div>
          <div className="eyebrow mb-5">Explore</div>
          <div className="grid gap-3 text-sm text-white/55">
            <Link href="/about">About</Link><Link href="/research">Research</Link><Link href="/technology">Technology</Link><Link href="/intelligence">Intelligence</Link><Link href="/ira-dev">Ira Dev</Link>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-5">Connect</div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-[#e1c46b]">Institutional enquiries <ArrowUpRight size={14}/></Link>
          <div className="mt-8 grid gap-3 text-xs text-white/35"><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/disclosures">Disclosures</Link></div>
        </div>
      </div>
      <div className="container-shell flex flex-col justify-between gap-3 border-t border-white/10 py-5 text-[10px] tracking-wide text-white/30 md:flex-row">
        <span>© {new Date().getFullYear()} MidShaSum Research. All rights reserved.</span>
        <span>Independent thought. Disciplined exploration.</span>
      </div>
    </footer>
  );
}
