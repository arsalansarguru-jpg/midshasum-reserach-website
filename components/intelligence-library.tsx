"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import type { IntelligenceArticle, IntelligenceCategory } from "@/lib/intelligence";

const CATEGORIES: Array<"All" | IntelligenceCategory> = [
  "All",
  "Research Note",
  "Institutional Perspective",
  "Technical Article",
  "Market Observation",
  "Publication"
];

export function IntelligenceLibrary({ articles }: { articles: IntelligenceArticle[] }) {
  const [activeCategory, setActiveCategory] = useState<"All" | IntelligenceCategory>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter publications by category">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[.16em] transition-colors ${
                  active
                    ? "border-[#c9a227] bg-[#c9a227]/15 text-[#e1c46b]"
                    : "border-white/10 bg-[#0d1015] text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/40">
          {filtered.length} {filtered.length === 1 ? "Entry" : "Entries"}
        </span>
      </div>

      {/* Article Grid or Honest Empty State */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/intelligence/${article.slug}`}
              className="group flex flex-col justify-between border border-white/10 bg-[#0b0d12] p-7 transition-colors hover:border-[#c9a227]/45"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">{article.category}</span>
                  <time
                    dateTime={article.publishedAt}
                    className="font-mono text-[10px] text-white/40"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("en", {
                      dateStyle: "medium",
                      timeZone: "UTC"
                    })}
                  </time>
                </div>
                <h2 className="font-display mt-4 text-2xl font-light text-white group-hover:text-[#e1c46b]">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/55">{article.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/45">
                <span>{article.author}</span>
                <span className="inline-flex items-center gap-1.5 text-[#e1c46b]">
                  Read <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-y border-white/10 py-10">
          <div className="flex items-start gap-5">
            <BookOpen className="mt-1 shrink-0 text-[#c9a227]" size={24} aria-hidden="true" />
            <div>
              <div className="eyebrow">Editorial programme</div>
              <h2 className="font-display mt-4 text-2xl font-light text-white">
                No publications yet.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-white/50">
                New material will appear here after editorial and factual review. No articles or market opinions are attributed to individuals at this time.
              </p>
              <div className="mt-7 inline-flex items-center gap-2 text-xs tracking-widest text-[#d8b84f]">
                EVIDENCE · CONTEXT · PERSPECTIVE <ArrowUpRight size={14} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
