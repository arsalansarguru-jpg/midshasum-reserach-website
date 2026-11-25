 "use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["About", "/about"],
  ["Research", "/research"],
  ["Technology", "/technology"],
  ["Intelligence", "/intelligence"],
  ["Ira Dev", "/ira-dev"]
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/95 backdrop-blur-xl" onKeyDown={closeOnEscape}>
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-mark.webp" alt="" width={42} height={42} priority unoptimized className="h-9 w-9 object-contain"/>
          <div>
            <div className="font-display text-[13px] font-semibold tracking-[.16em]">MIDSHASUM</div>
            <div className="mt-0.5 text-[9px] tracking-[.38em] text-[#c9a227]">RESEARCH</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className="nav-link text-[11px] tracking-[.08em] text-white/65 hover:text-[#e1c46b]">{label}</Link>)}
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} className="btn-gold !px-4 !py-3">Enquire <ArrowUpRight size={14}/></Link>
        </nav>
        <button className="p-2 text-white lg:hidden" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>
      </div>
      {open && <nav id="mobile-navigation" className="menu-panel border-t border-white/10 bg-[#0c0e12] px-6 py-5 lg:hidden" aria-label="Mobile navigation">
        {[...links, ["Contact", "/contact"] as const].map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-sm text-white/80 hover:text-[#e1c46b]">{label}</Link>)}
      </nav>}
    </header>
  );
}
