"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { code: "01", label: "About", href: "/about" },
  { code: "02", label: "Research", href: "/research" },
  { code: "03", label: "Technology", href: "/technology" },
  { code: "04", label: "Intelligence", href: "/intelligence" },
  { code: "05", label: "Ira Dev", href: "/ira-dev" }
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") setOpen(false);
  }

  const isRouteActive = (href: string) =>
    pathname === href || (href === "/intelligence" && pathname.startsWith("/intelligence/"));

  return (
    <>
      {/* ─── DESKTOP VERTICAL GLASSMORPHISM RAIL (lg+) ─── */}
      <aside
        className="glass-rail fixed inset-y-0 left-0 z-50 hidden w-[224px] flex-col justify-between border-r border-white/10 px-6 py-7 lg:flex 2xl:w-[240px]"
        aria-label="Primary institutional navigation"
      >
        <div>
          <Link
            href="/"
            className="group flex items-center gap-3 border-b border-white/10 pb-6"
          >
            <Image
              src="/brand/logo-mark.webp"
              alt=""
              width={42}
              height={42}
              priority
              unoptimized
              className="h-9 w-9 shrink-0 object-contain"
            />
            <div>
              <div className="font-display text-[13px] font-semibold tracking-[.16em] text-white">
                MIDSHASUM
              </div>
              <div className="mt-0.5 text-[9px] tracking-[.38em] text-[#c9a227]">
                RESEARCH
              </div>
            </div>
          </Link>

          <nav className="mt-8" aria-label="Main navigation">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[.24em] text-white/35">
              Navigation
            </p>
            <ul className="space-y-1.5">
              {navItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 border-l-2 px-3 py-2.5 text-[12px] tracking-[.06em] transition-all ${
                        active
                          ? "border-[#c9a227] bg-[#c9a227]/10 text-[#e1c46b] font-medium"
                          : "border-transparent text-white/65 hover:border-white/25 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <span
                        className={`font-mono text-[9px] tabular-nums ${
                          active ? "text-[#c9a227]" : "text-white/30 group-hover:text-white/55"
                        }`}
                      >
                        {item.code}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="btn-gold w-full justify-between !px-4 !py-3.5"
          >
            <span>Enquire</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <p className="font-mono text-[8.5px] uppercase leading-4 tracking-[.2em] text-white/30">
            Beyond the Known. By Design.
          </p>
        </div>
      </aside>

      {/* ─── MOBILE & TABLET COMPACT GLASS BAR (< lg) ─── */}
      <header
        className="glass-rail sticky top-0 z-50 border-b border-white/10 lg:hidden"
        onKeyDown={closeOnEscape}
      >
        <div className="container-shell flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/brand/logo-mark.webp"
              alt=""
              width={42}
              height={42}
              priority
              unoptimized
              className="h-8 w-8 object-contain"
            />
            <div>
              <div className="font-display text-[12px] font-semibold tracking-[.16em]">MIDSHASUM</div>
              <div className="mt-0.5 text-[8px] tracking-[.36em] text-[#c9a227]">RESEARCH</div>
            </div>
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.03] text-white transition-colors hover:border-[#c9a227]/50"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-navigation"
            className="menu-panel border-t border-white/10 bg-[#080808]/95 px-6 py-6 backdrop-blur-xl"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-sm ${
                    pathname === "/" ? "text-[#e1c46b]" : "text-white/80 hover:text-[#e1c46b]"
                  }`}
                >
                  <span>Home</span>
                  <span className="font-mono text-[10px] text-white/35">00</span>
                </Link>
              </li>
              {navItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-sm ${
                        active ? "text-[#e1c46b]" : "text-white/80 hover:text-[#e1c46b]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] text-[#c9a227]/70">{item.code}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="btn-gold mt-6 w-full justify-between"
            >
              <span>Enquire</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
