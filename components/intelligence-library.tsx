"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowUpRight, Search } from "lucide-react";
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
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = articles.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      a.title.toLowerCase().includes(normalizedQuery) ||
      a.excerpt.toLowerCase().includes(normalizedQuery) ||
      a.category.toLowerCase().includes(normalizedQuery) ||
      a.author.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div className="space-y-8">
      {/* Search + Category Filter Bar */}
      <div className="space-y-5 border-b border-black/12 pb-6">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4E5561]"
            size={15}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications by title, topic or category..."
            aria-label="Search publications"
            className="w-full border border-black/15 bg-[#FAF8F4] py-3 pl-11 pr-4 text-sm text-[#0B0E13] placeholder:text-[#4E5561]/70 outline-none transition-colors focus:border-[#8C6D14]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
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
                      ? "border-[#0B0E13] bg-[#0B0E13] text-[#F2F0E9]"
                      : "border-black/15 bg-[#FAF8F4] text-[#4E5561] hover:border-black/35 hover:text-[#0B0E13]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#4E5561]">
            {filtered.length} {filtered.length === 1 ? "Entry" : "Entries"}
          </span>
        </div>
      </div>

      {/* Article Grid or Honest Empty State */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/intelligence/${article.slug}`}
              className="group flex flex-col justify-between border border-black/12 bg-[#FAF8F4] p-7 transition-colors hover:border-[#8C6D14]"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow-ivory">{article.category}</span>
                  <time
                    dateTime={article.publishedAt}
                    className="font-mono text-[10px] text-[#4E5561]"
                  >
                    {new Date(article.publishedAt).toLocaleDateString("en", {
                      dateStyle: "medium",
                      timeZone: "UTC"
                    })}
                  </time>
                </div>
                <h2 className="font-display mt-4 text-2xl font-light text-[#0B0E13] group-hover:text-[#8C6D14]">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#4E5561]">{article.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs text-[#4E5561]">
                <span>{article.author}</span>
                <span className="inline-flex items-center gap-1.5 text-[#8C6D14]">
                  Read <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-black/12 bg-[#FAF8F4] p-8 md:p-12">
          <div className="flex items-start gap-5">
            <BookOpen className="mt-1 shrink-0 text-[#8C6D14]" size={24} aria-hidden="true" />
            <div>
              <div className="eyebrow-ivory">Editorial programme</div>
              <h2 className="font-display mt-4 text-2xl font-light text-[#0B0E13]">
                {articles.length === 0 ? "No publications yet." : "No matching publications."}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-[#4E5561]">
                {articles.length === 0
                  ? "New material will appear here after editorial and factual review. No articles or market opinions are attributed to individuals at this time."
                  : "Try clearing the search filter or selecting a different category."}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#8C6D14]">
                EVIDENCE · CONTEXT · PERSPECTIVE <ArrowUpRight size={14} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
