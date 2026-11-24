import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
 const base = "https://midshasumresearch.com";
 return ["", "/about", "/research", "/technology", "/intelligence", "/ira-dev", "/contact", "/privacy", "/terms", "/disclosures"].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
