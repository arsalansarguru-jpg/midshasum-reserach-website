import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "https://midshasum-research-preview.vercel.app";
const beforeDesktop = path.resolve("reports/complete-redesign/screenshots/before/desktop");
const beforeMobile = path.resolve("reports/complete-redesign/screenshots/before/mobile");

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

try {
  await mkdir(beforeDesktop, { recursive: true });
  await mkdir(beforeMobile, { recursive: true });

  const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pD = await ctxD.newPage();
  for (const [route, slug] of routes) {
    const resp = await pD.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await pD.waitForTimeout(800);
    audit[route] = {
      status: resp?.status(),
      desktop: await pD.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        scrollHeight: document.body.scrollHeight,
        h1: document.querySelector("h1")?.textContent?.trim() ?? null,
        brokenImages: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length
      }))
    };
    await pD.screenshot({ path: path.join(beforeDesktop, `${slug}.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctxD.close();

  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pM = await ctxM.newPage();
  for (const [route, slug] of routes) {
    await pM.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 45_000 });
    await pM.waitForTimeout(700);
    audit[route].mobile = await pM.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollHeight: document.body.scrollHeight
    }));
    await pM.screenshot({ path: path.join(beforeMobile, `${slug}.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctxM.close();

  await writeFile(path.resolve("reports/complete-redesign/before-audit.json"), JSON.stringify(audit, null, 2));
  console.log(JSON.stringify(audit, null, 2));
} finally {
  await browser.close();
}
