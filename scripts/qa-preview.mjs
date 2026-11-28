import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = "https://midshasum-research-preview.vercel.app";
const outDir = path.resolve("reports/preview-qa/screenshots");
const consoleErrors = [];
const pageErrors = [];

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

try {
  await mkdir(outDir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  const routes = [
    ["/", null, "home-1440.png"],
    ["/about", "Guiding principles", "about-1440.png"],
    ["/research", "Quantitative methods", "research-1440.png"],
    ["/technology", "Conceptual Stack", "technology-1440.png"],
    ["/intelligence", "Editorial programme", "intelligence-1440.png"],
    ["/ira-dev", "Areas of Interest", "ira-dev-1440.png"],
    ["/contact", "Institutional enquiries", "contact-1440.png"]
  ];

  const results = {};
  for (const [route, matchText, shot] of routes) {
    const resp = await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(900);
    if (matchText) {
      await page.locator(`text=${matchText}`).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
    }
    const check = await page.evaluate(() => {
      const rail = document.querySelector("aside[aria-label='Primary institutional navigation']");
      const card = document.querySelector(".glass-card, .glass-card-interactive, .glass-card-elevated, .glass-card-gold");
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length,
        railVisible: rail ? getComputedStyle(rail).display !== "none" : false,
        backdropFilter: card ? (getComputedStyle(card).backdropFilter || getComputedStyle(card).webkitBackdropFilter) : null
      };
    });
    results[route] = { status: resp?.status(), ...check };
    await page.screenshot({ path: path.join(outDir, shot), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctx.close();

  // Mobile 390x844 check
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto(new URL("/research", baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
  await mPage.waitForTimeout(700);
  const mobileCheck = await mPage.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    menuButtonVisible: Boolean(document.querySelector("button[aria-controls='mobile-navigation']"))
  }));
  await mPage.screenshot({ path: path.join(outDir, "research-mobile-390.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
  await mCtx.close();

  const summary = { baseUrl, results, mobileCheck, consoleErrors, pageErrors };
  await writeFile(path.join(path.resolve("reports/preview-qa"), "preview-qa.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (consoleErrors.length > 0 || pageErrors.length > 0) process.exitCode = 1;
} finally {
  await browser.close();
}
