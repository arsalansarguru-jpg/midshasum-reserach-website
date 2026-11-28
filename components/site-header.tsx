"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Technology", href: "/technology" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Ira Dev", href: "/ira-dev" }
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
    <header
      className="glass-rail sticky top-0 z-50 border-b border-white/10"
      onKeyDown={closeOnEscape}
    >
      <div className="container-shell flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-mark.webp"
            alt=""
            width={40}
            height={40}
            priority
            unoptimized
            className="h-8 w-8 object-contain lg:h-9 lg:w-9"
          />
          <div>
            <div className="font-display text-[13px] font-semibold tracking-[.16em] text-[#F2F0E9]">
              MIDSHASUM
            </div>
            <div className="mt-0.5 font-mono text-[8.5px] tracking-[.34em] text-[#C9A227]">
              RESEARCH
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="nav-link font-body text-[12px] font-medium tracking-[.06em] text-[#F2F0E9]/70 hover:text-[#E1C46B]"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="btn-gold !px-4 !py-2.5"
          >
            <span>Enquire</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/[0.03] text-[#F2F0E9] transition-colors hover:border-[#C9A227]/60 lg:hidden"
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
          className="menu-panel border-t border-white/10 bg-[#080A0D]/95 px-6 py-6 backdrop-blur-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-sm ${
                  pathname === "/" ? "text-[#E1C46B]" : "text-[#F2F0E9]/85 hover:text-[#E1C46B]"
                }`}
              >
                <span>Home</span>
                <span className="font-mono text-[10px] text-white/35">00</span>
              </Link>
            </li>
            {navItems.map((item, idx) => {
              const active = isRouteActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-sm ${
                      active ? "text-[#E1C46B]" : "text-[#F2F0E9]/85 hover:text-[#E1C46B]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-[#C9A227]/75">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
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
  );
}
