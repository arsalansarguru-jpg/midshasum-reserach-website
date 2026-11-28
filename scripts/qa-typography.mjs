import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/typography/screenshots");
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

const pages = [
  ["/", "home"],
  ["/about", "about"],
  ["/research", "research"],
  ["/technology", "technology"],
  ["/intelligence", "intelligence"],
  ["/ira-dev", "ira-dev"]
];

try {
  await mkdir(outDir, { recursive: true });
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx1440.newPage();

  const fontChecks = {};
  for (const [route, slug] of pages) {
    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    fontChecks[route] = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const eyebrow = document.querySelector(".eyebrow");
      const bodyCs = getComputedStyle(document.body);
      const h1Cs = h1 ? getComputedStyle(h1) : null;
      const ebCs = eyebrow ? getComputedStyle(eyebrow) : null;
      const loadedFaces = Array.from(document.fonts)
        .filter((f) => f.status === "loaded")
        .map((f) => f.family);
      return {
        bodyFont: bodyCs.fontFamily,
        bodySize: bodyCs.fontSize,
        h1Font: h1Cs?.fontFamily ?? null,
        h1Size: h1Cs?.fontSize ?? null,
        eyebrowFont: ebCs?.fontFamily ?? null,
        eyebrowSize: ebCs?.fontSize ?? null,
        loadedFamilies: [...new Set(loadedFaces)]
      };
    });
    await page.screenshot({ path: path.join(outDir, `${slug}-1440.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctx1440.close();

  const ctx390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await ctx390.newPage();
  for (const [route, slug] of pages) {
    await mPage.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
    await mPage.evaluate(() => document.fonts.ready);
    await mPage.waitForTimeout(600);
    await mPage.screenshot({ path: path.join(outDir, `${slug}-390.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctx390.close();

  await writeFile(path.join(path.resolve("reports/typography"), "font-checks.json"), JSON.stringify({ fontChecks }, null, 2));
  console.log(JSON.stringify({ fontChecks }, null, 2));
} finally {
  await browser.close();
}
