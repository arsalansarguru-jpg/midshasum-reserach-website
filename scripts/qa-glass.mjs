import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/glassmorphism/screenshots");
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

try {
  await mkdir(outDir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const captures = [
    ["/about", "Guiding principles", "about-glass-1440.png"],
    ["/research", "Quantitative methods", "research-glass-1440.png"],
    ["/technology", "Conceptual Stack", "technology-glass-1440.png"],
    ["/intelligence", "Editorial programme", "intelligence-glass-1440.png"],
    ["/ira-dev", "Areas of Interest", "ira-dev-glass-1440.png"],
    ["/contact", "Institutional enquiries", "contact-glass-1440.png"]
  ];

  const backdropChecks = {};
  for (const [route, textMatch, filename] of captures) {
    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForTimeout(600);
    const target = page.locator(`text=${textMatch}`).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    backdropChecks[route] = await page.evaluate(() => {
      const card = document.querySelector(".glass-card, .glass-card-interactive, .glass-card-elevated, .glass-card-gold");
      if (!card) return null;
      const cs = getComputedStyle(card);
      return {
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
        backgroundColor: cs.backgroundColor,
        borderColor: cs.borderColor
      };
    });
    await page.screenshot({ path: path.join(outDir, filename), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctx.close();

  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto(new URL("/contact", baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
  await mPage.waitForTimeout(500);
  await mPage.locator("form").scrollIntoViewIfNeeded();
  await mPage.waitForTimeout(300);
  await mPage.screenshot({ path: path.join(outDir, "contact-mobile-390.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
  await mCtx.close();

  await writeFile(path.join(path.resolve("reports/glassmorphism"), "glass-qa.json"), JSON.stringify({ backdropChecks }, null, 2));
  console.log(JSON.stringify({ backdropChecks }, null, 2));
} finally {
  await browser.close();
}
