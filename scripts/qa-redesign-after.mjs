import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const afterDesktop = path.resolve("reports/complete-redesign/screenshots/desktop");
const afterMobile = path.resolve("reports/complete-redesign/screenshots/mobile");

const routes = [
  ["/", "home"],
  ["/about", "about"],
  ["/research", "research"],
  ["/technology", "technology"],
  ["/intelligence", "intelligence"],
  ["/ira-dev", "ira-dev"],
  ["/contact", "contact"],
  ["/privacy", "privacy"],
  ["/terms", "terms"],
  ["/disclosures", "disclosures"]
];

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const audit = {};
const consoleErrors = [];
const failedRequests = [];

try {
  await mkdir(afterDesktop, { recursive: true });
  await mkdir(afterMobile, { recursive: true });

  const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pD = await ctxD.newPage();
  pD.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push({ viewport: "1440x900", url: pD.url(), text: msg.text() });
  });
  pD.on("requestfailed", (req) => {
    failedRequests.push({ viewport: "1440x900", url: req.url(), reason: req.failure()?.errorText ?? "failed" });
  });

  for (const [route, slug] of routes) {
    const resp = await pD.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await pD.waitForTimeout(800);
    audit[route] = {
      status: resp?.status(),
      desktop: await pD.evaluate(() => {
        const h1 = document.querySelector("h1");
        return {
          overflow1440: document.documentElement.scrollWidth > window.innerWidth,
          scrollHeight: document.body.scrollHeight,
          h1: h1?.textContent?.trim() ?? null,
          h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
          bodyFont: getComputedStyle(document.body).fontFamily,
          brokenImages: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length
        };
      })
    };
    await pD.screenshot({ path: path.join(afterDesktop, `${slug}.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
    if (slug === "home" || slug === "about" || slug === "research" || slug === "technology") {
      await pD.screenshot({ path: path.join(afterDesktop, `${slug}-full.png`), fullPage: true, animations: "disabled", timeout: 45_000 });
    }
  }
  await ctxD.close();

  // Check 1280px laptop width overflow
  const ctx1280 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p1280 = await ctx1280.newPage();
  for (const [route] of routes) {
    await p1280.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await p1280.waitForTimeout(400);
    audit[route].desktop1280Overflow = await p1280.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  }
  await ctx1280.close();

  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pM = await ctxM.newPage();
  for (const [route, slug] of routes) {
    await pM.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await pM.waitForTimeout(700);
    audit[route].mobile = await pM.evaluate(() => ({
      overflow390: document.documentElement.scrollWidth > window.innerWidth,
      scrollHeight: document.body.scrollHeight
    }));
    await pM.screenshot({ path: path.join(afterMobile, `${slug}.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctxM.close();

  // Check 360px small mobile width overflow
  const ctx360 = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const p360 = await ctx360.newPage();
  for (const [route] of routes) {
    await p360.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await p360.waitForTimeout(400);
    audit[route].mobile360Overflow = await p360.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  }
  await ctx360.close();

  const summary = { audit, consoleErrors, failedRequests };
  await writeFile(path.resolve("reports/complete-redesign/after-audit.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
