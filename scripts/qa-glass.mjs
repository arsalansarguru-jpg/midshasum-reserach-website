import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/glassmorphism/screenshots");
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

const captures = [
  ["/about", "Guiding principles", "about"],
  ["/research", "Quantitative methods", "research"],
  ["/technology", "Conceptual Stack", "technology"],
  ["/intelligence", "Editorial programme", "intelligence"],
  ["/ira-dev", "Areas of Interest", "ira-dev"],
  ["/contact", "Institutional enquiries", "contact"]
];

try {
  await mkdir(outDir, { recursive: true });
  const backdropChecks = {};

  for (const [label, width, height] of [
    ["1440", 1440, 900],
    ["mobile-390", 390, 844]
  ]) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();

    for (const [route, textMatch, slug] of captures) {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
      await page.waitForTimeout(600);
      const target = page.locator(`text=${textMatch}`).first();
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      if (label === "1440") {
        backdropChecks[route] = await page.evaluate(() => {
          const card = document.querySelector(".glass-card, .glass-card-interactive, .glass-card-elevated, .glass-card-gold");
          if (!card) return null;
          const cs = getComputedStyle(card);
          return {
            backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
            backgroundImage: cs.backgroundImage,
            borderColor: cs.borderColor
          };
        });
      }

      await page.screenshot({
        path: path.join(outDir, `${slug}-glass-${label}.png`),
        fullPage: false,
        animations: "disabled",
        timeout: 45_000
      });
    }
    await ctx.close();
  }

  await writeFile(path.join(path.resolve("reports/glassmorphism"), "glass-qa.json"), JSON.stringify({ backdropChecks }, null, 2));
  console.log(JSON.stringify({ backdropChecks }, null, 2));
} finally {
  await browser.close();
}
