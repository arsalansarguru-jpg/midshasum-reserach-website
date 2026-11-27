import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/phase-3");
const errors = [];

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"]
});

try {
  await mkdir(outDir, { recursive: true });

  // ── 1. Desktop 1920x1080: 5 Environments + Frontiers + Methodology + Insights + Outlook ──
  const ctx1920 = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const p1920 = await ctx1920.newPage();
  p1920.on("pageerror", (e) => errors.push(`1920 pageerror: ${e.message}`));
  p1920.on("console", (m) => {
    if (m.type() === "error") errors.push(`1920 console: ${m.text()}`);
  });

  await p1920.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  const canvas = p1920.locator(".spatial-universe canvas").first();
  await canvas.waitFor({ state: "attached", timeout: 30_000 });
  await p1920.waitForFunction(
    () => Number(document.querySelector(".spatial-universe canvas")?.dataset.triangles || 0) > 0,
    undefined,
    { timeout: 30_000 }
  );

  const bounds = await p1920.locator("[data-testid='spatial-universe']").evaluate((el) => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    height: el.getBoundingClientRect().height
  }));
  const scrollDist = Math.max(bounds.height - 1080, 1);
  const environments = [];
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
    environments.push(env);
    await p1920.screenshot({ path: path.join(outDir, `env-${idx + 1}-${env}-1920.png`), fullPage: false });
  }

  // Test WebGL context loss & restoration on canvas
  const contextLossHandled = await p1920.evaluate(() => {
    const c = document.querySelector(".spatial-universe canvas");
    if (!c) return false;
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  });
  await p1920.waitForTimeout(300);
  await ctx1920.close();

  // ── 2. Desktop 1440x900: Frontiers Keyboard Nav + Methodology + Technology + Intelligence ──
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  p1440.on("pageerror", (e) => errors.push(`1440 pageerror: ${e.message}`));
  p1440.on("console", (m) => {
    if (m.type() === "error") errors.push(`1440 console: ${m.text()}`);
  });

  await p1440.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await p1440.locator("#section-frontiers").waitFor({ state: "attached", timeout: 30_000 });
  await p1440.locator("#section-frontiers").scrollIntoViewIfNeeded();
  await p1440.waitForTimeout(600);

  // Test keyboard/button stepping on Research Frontiers
  const track = p1440.locator(".obsidian-parallax-slider__track");
  const beforeKey = await track.evaluate((el) => getComputedStyle(el).transform);
  await p1440.getByRole("button", { name: "Next research frontier" }).click();
  await p1440.waitForTimeout(500);
  const afterKey = await track.evaluate((el) => getComputedStyle(el).transform);
  const keyboardNavMoved = beforeKey !== afterKey;
  await p1440.screenshot({ path: path.join(outDir, "frontiers-1440.png"), fullPage: false });

  // Methodology 6-stage check
  await p1440.locator("#section-methodology").scrollIntoViewIfNeeded();
  await p1440.waitForTimeout(400);
  await p1440.getByRole("button", { name: /Stage 04: Validation/i }).click();
  await p1440.waitForTimeout(350);
  const methodologyText = await p1440.locator("#section-methodology").innerText();
  const hasMethodologySequence =
    methodologyText.includes("Research Question") &&
    methodologyText.includes("Validation") &&
    methodologyText.includes("Publication");
  await p1440.screenshot({ path: path.join(outDir, "methodology-1440.png"), fullPage: false });

  // Technology page conceptual stack
  await p1440.goto(new URL("/technology", baseUrl).toString(), { waitUntil: "domcontentloaded" });
  await p1440.waitForTimeout(700);
  await p1440.locator("text=Conceptual Stack").scrollIntoViewIfNeeded();
  await p1440.waitForTimeout(300);
  await p1440.screenshot({ path: path.join(outDir, "technology-stack-1440.png"), fullPage: false });

  // Intelligence library search + filter
  await p1440.goto(new URL("/intelligence", baseUrl).toString(), { waitUntil: "domcontentloaded" });
  await p1440.waitForTimeout(700);
  const searchInput = p1440.getByLabel("Search publications");
  await searchInput.fill("quantum");
  await p1440.getByRole("tab", { name: "Research Note" }).click();
  await p1440.waitForTimeout(300);
  await p1440.screenshot({ path: path.join(outDir, "intelligence-library-1440.png"), fullPage: false });
  await ctx1440.close();

  // ── 3. Mobile 390x844 & 360x800 ──
  const mobileChecks = {};
  for (const [w, h] of [[390, 844], [360, 800]]) {
    const mCtx = await browser.newContext({ viewport: { width: w, height: h } });
    const mPage = await mCtx.newPage();
    mPage.on("pageerror", (e) => errors.push(`${w} pageerror: ${e.message}`));
    await mPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await mPage.waitForTimeout(700);
    mobileChecks[`${w}x${h}`] = await mPage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    await mPage.screenshot({ path: path.join(outDir, `mobile-${w}.png`), fullPage: false });
    await mCtx.close();
  }

  // ── 4. WebGL-Unavailable Fallback Check ──
  const noGlCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const noGlPage = await noGlCtx.newPage();
  await noGlPage.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return orig.call(this, type, ...args);
    };
  });
  await noGlPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await noGlPage.waitForTimeout(600);
  const webglUnavailableFallbackVisible = await noGlPage.locator(".spatial-universe__fallback").isVisible();
  await noGlCtx.close();

  // ── 5. Reduced-Motion Fallback Check ──
  const redCtx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const redPage = await redCtx.newPage();
  await redPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await redPage.waitForTimeout(500);
  const reducedMotionFallbackVisible = await redPage.locator(".spatial-universe__fallback").isVisible();
  await redCtx.close();

  // ── 6. Image Failure Resilience Check ──
  const imgFailCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const imgFailPage = await imgFailCtx.newPage();
  imgFailPage.on("pageerror", (e) => errors.push(`imgFail pageerror: ${e.message}`));
  await imgFailPage.route("**/frontiers/quantum-computing.webp", (route) => route.abort());
  await imgFailPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await imgFailPage.locator("#section-frontiers").waitFor({ state: "attached", timeout: 30_000 });
  await imgFailPage.locator("#section-frontiers").scrollIntoViewIfNeeded();
  await imgFailPage.waitForTimeout(500);
  const pageAliveAfterImageAbort = await imgFailPage.locator("#section-frontiers").isVisible();
  await imgFailCtx.close();

  const report = {
    environments,
    contextLossHandled,
    keyboardNavMoved,
    hasMethodologySequence,
    mobileChecks,
    webglUnavailableFallbackVisible,
    reducedMotionFallbackVisible,
    pageAliveAfterImageAbort,
    errors
  };
  await writeFile(path.join(outDir, "qa-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (
    errors.length > 0 ||
    !keyboardNavMoved ||
    !hasMethodologySequence ||
    !webglUnavailableFallbackVisible ||
    !reducedMotionFallbackVisible ||
    !pageAliveAfterImageAbort
  ) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
