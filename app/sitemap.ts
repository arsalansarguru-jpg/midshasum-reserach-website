import type { MetadataRoute } from "next";
import { intelligenceArticles } from "@/lib/intelligence";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://midshasumresearch.com";
  const pages = ["", "/about", "/research", "/technology", "/intelligence", "/ira-dev", "/contact", "/privacy", "/terms", "/disclosures"];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    })),
    ...intelligenceArticles.map((article) => ({
      url: `${base}/intelligence/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6
    }))
  ];
}
