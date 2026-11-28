import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/phase-4/screenshots");
const consoleErrors = [];
const pageErrors = [];

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"]
});

try {
  await mkdir(outDir, { recursive: true });

  // 1. 1920x1080 Desktop: 5 Environments + Frontiers + Methodology + Insights + Contact
  const ctx1920 = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const p1920 = await ctx1920.newPage();
  p1920.on("pageerror", (e) => pageErrors.push(`1920: ${e.message}`));
  p1920.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`1920: ${m.text()}`);
  });

  await p1920.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  const canvas = p1920.locator(".spatial-universe canvas").first();
  await canvas.waitFor({ state: "attached", timeout: 30_000 });
  await p1920.waitForFunction(
    () => Number(document.querySelector(".spatial-universe canvas")?.dataset.triangles || 0) > 0,
    undefined,
    { timeout: 30_000 }
  );
  await p1920.waitForTimeout(700);
  await p1920.screenshot({ path: path.join(outDir, "home-1920.png"), fullPage: false, animations: "disabled", timeout: 45_000 });

  const bounds = await p1920.locator("[data-testid='spatial-universe']").evaluate((el) => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    height: el.getBoundingClientRect().height
  }));
  const scrollDist = Math.max(bounds.height - 1080, 1);
  const envMetrics = [];
  for (const [idx, env] of ["core", "research", "architecture", "intelligence", "outlook"].entries()) {
    const pos = idx === 4 ? 0.96 : idx / 4;
    await p1920.evaluate(({ top, dist, p }) => window.scrollTo(0, top + dist * p), {
      top: bounds.top,
      dist: scrollDist,
      p: pos
    });
    await p1920.waitForFunction(
      (expected) => document.querySelector(".spatial-universe canvas")?.dataset.environment === expected,
      env,
      { timeout: 10_000 }
    );
    await p1920.waitForTimeout(350);
    const m = await canvas.evaluate((el) => ({
      env: el.dataset.environment,
      triangles: Number(el.dataset.triangles),
      drawCalls: Number(el.dataset.drawCalls),
      cameraZ: Number(el.dataset.cameraZ)
    }));
    envMetrics.push(m);
    await p1920.screenshot({ path: path.join(outDir, `env-${idx + 1}-${env}-1920.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
  }
  await ctx1920.close();

  // 2. 1440x900 Desktop: Home, Frontiers, Methodology, Technology, Intelligence, Ira Dev, Contact
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  p1440.on("pageerror", (e) => pageErrors.push(`1440: ${e.message}`));
  p1440.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`1440: ${m.text()}`);
  });

  await p1440.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await p1440.waitForFunction(
    () => Number(document.querySelector(".spatial-universe canvas")?.dataset.triangles || 0) > 0,
    undefined,
    { timeout: 30_000 }
  );
  await p1440.waitForTimeout(600);
  await p1440.screenshot({ path: path.join(outDir, "home-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });

  await p1440.locator("#section-frontiers").scrollIntoViewIfNeeded();
  await p1440.waitForTimeout(600);
  await p1440.screenshot({ path: path.join(outDir, "frontiers-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });

  await p1440.locator("#section-methodology").scrollIntoViewIfNeeded();
  await p1440.waitForTimeout(450);
  await p1440.screenshot({ path: path.join(outDir, "methodology-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });

  // SEO & Canonical check across routes
  const seoChecks = {};
  for (const r of ["/", "/about", "/research", "/technology", "/intelligence", "/ira-dev", "/contact", "/privacy", "/terms", "/disclosures"]) {
    const resp = await p1440.goto(new URL(r, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
    await p1440.waitForTimeout(500);
    const meta = await p1440.evaluate(() => ({
      title: document.title,
      canonical: document.querySelector("link[rel='canonical']")?.getAttribute("href"),
      robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      brokenImages: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length
    }));
    seoChecks[r] = { status: resp?.status(), ...meta };
    if (r === "/technology") await p1440.screenshot({ path: path.join(outDir, "technology-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
    if (r === "/intelligence") await p1440.screenshot({ path: path.join(outDir, "intelligence-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
    if (r === "/ira-dev") await p1440.screenshot({ path: path.join(outDir, "ira-dev-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
    if (r === "/contact") await p1440.screenshot({ path: path.join(outDir, "contact-1440.png"), fullPage: false, animations: "disabled", timeout: 45_000 });
  }

  // Contact form validation check
  const contactValidation = await p1440.evaluate(() => {
    const form = document.querySelector("form");
    const name = form?.querySelector("input[name='name']");
    const email = form?.querySelector("input[name='email']");
    const category = form?.querySelector("select[name='category']");
    const message = form?.querySelector("textarea[name='message']");
    const submit = form?.querySelector("button[type='submit']");
    return {
      formPresent: Boolean(form),
      nameRequired: name?.hasAttribute("required") ?? false,
      emailType: email?.getAttribute("type"),
      categoryRequired: category?.hasAttribute("required") ?? false,
      messageMinLength: message?.getAttribute("minLength"),
      submitDisabledWhenUnconfigured: submit?.hasAttribute("disabled") ?? false
    };
  });
  await ctx1440.close();

  // 3. Mobile 390x844 & 360x800
  const mobileChecks = {};
  for (const [w, h] of [[390, 844], [360, 800]]) {
    const mCtx = await browser.newContext({ viewport: { width: w, height: h } });
    const mPage = await mCtx.newPage();
    mPage.on("pageerror", (e) => pageErrors.push(`mobile-${w}: ${e.message}`));
    await mPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await mPage.waitForTimeout(800);
    mobileChecks[`${w}x${h}`] = await mPage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    await mPage.screenshot({ path: path.join(outDir, `mobile-${w}.png`), fullPage: false, animations: "disabled", timeout: 45_000 });
    await mCtx.close();
  }

  const auditData = {
    envMetrics,
    seoChecks,
    contactValidation,
    mobileChecks,
    consoleErrors,
    pageErrors
  };
  await writeFile(path.join(path.resolve("reports/phase-4"), "audit-data.json"), JSON.stringify(auditData, null, 2));
  console.log(JSON.stringify(auditData, null, 2));
} finally {
  await browser.close();
}
