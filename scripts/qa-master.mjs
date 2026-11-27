import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("reports/master-qa");
const errors = [];

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"]
});

try {
  await mkdir(outDir, { recursive: true });

  // 1. 1920x1080 Desktop Arrival + 5-Environment Scroll Verification
  const ctx1920 = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx1920.newPage();
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });

  const res = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  if (res?.status() !== 200) throw new Error(`Home returned ${res?.status()}`);

  const canvas = page.locator(".spatial-universe canvas").first();
  await canvas.waitFor({ state: "attached", timeout: 30_000 });
  await page.waitForFunction(
    () => Number(document.querySelector(".spatial-universe canvas")?.dataset.triangles || 0) > 0,
    undefined,
    { timeout: 30_000 }
  );
  await page.waitForTimeout(800);

  const webglMetrics = await canvas.evaluate((el) => ({
    environment: el.dataset.environment,
    triangles: Number(el.dataset.triangles),
    drawCalls: Number(el.dataset.drawCalls),
    webgl: el.dataset.webgl
  }));
  await page.screenshot({ path: path.join(outDir, "phase2-core-1920.png"), fullPage: false });

  // Scroll through all 5 spatial chapters and confirm each environment activates
  const universeBounds = await page.locator("[data-testid='spatial-universe']").evaluate((el) => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    height: el.getBoundingClientRect().height
  }));
  const scrollDist = Math.max(universeBounds.height - 1080, 1);
  const environmentsVisited = [];
  for (const [idx, env] of ["core", "research", "architecture", "intelligence", "outlook"].entries()) {
    const pos = idx === 4 ? 0.96 : idx / 4;
    await page.evaluate(
      ({ top, dist, p }) => window.scrollTo(0, top + dist * p),
      { top: universeBounds.top, dist: scrollDist, p: pos }
    );
    await page.waitForFunction(
      (expected) => document.querySelector(".spatial-universe canvas")?.dataset.environment === expected,
      env,
      { timeout: 10_000 }
    );
    await page.waitForTimeout(300);
    environmentsVisited.push(env);
  }
  await page.screenshot({ path: path.join(outDir, "phase2-outlook-1920.png"), fullPage: false });
  await ctx1920.close();

  // 2. 1440x900 Desktop — ObsidianUI Parallax Slider + Methodology + Secondary Routes + Ira Dev
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  p1440.on("pageerror", (e) => errors.push(`1440 pageerror: ${e.message}`));
  p1440.on("console", (m) => {
    if (m.type() === "error") errors.push(`1440 console: ${m.text()}`);
  });

  await p1440.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await p1440.locator("#section-frontiers").waitFor({ state: "attached", timeout: 30_000 });
  await p1440.locator("#section-frontiers").scrollIntoViewIfNeeded();
  await p1440.waitForFunction(
    () => {
      const imgs = Array.from(document.querySelectorAll("#section-frontiers img[data-parallax-image]")).slice(16, 24);
      return imgs.length === 8 && imgs.every((img) => img.complete && img.naturalWidth > 0);
    },
    undefined,
    { timeout: 15_000 }
  );

  const track = p1440.locator(".obsidian-parallax-slider__track");
  const beforeTransform = await track.evaluate((el) => getComputedStyle(el).transform);
  const vpBox = await p1440.locator(".obsidian-parallax-slider__viewport").boundingBox();
  if (!vpBox) throw new Error("Slider viewport missing");
  await p1440.mouse.move(vpBox.x + vpBox.width * 0.6, vpBox.y + vpBox.height * 0.5);
  await p1440.mouse.down();
  await p1440.mouse.move(vpBox.x + vpBox.width * 0.3, vpBox.y + vpBox.height * 0.5, { steps: 10 });
  await p1440.mouse.up();
  await p1440.waitForTimeout(450);
  const afterTransform = await track.evaluate((el) => getComputedStyle(el).transform);
  const sliderMoved = beforeTransform !== afterTransform;
  await p1440.screenshot({ path: path.join(outDir, "phase2-frontiers-1440.png"), fullPage: false });

  // Secondary routes
  const routes = ["/about", "/research", "/technology", "/intelligence", "/ira-dev", "/contact", "/privacy", "/terms", "/disclosures"];
  const routeStatuses = {};
  for (const r of routes) {
    const resp = await p1440.goto(new URL(r, baseUrl).toString(), { waitUntil: "domcontentloaded", timeout: 30_000 });
    routeStatuses[r] = resp?.status();
    if (resp?.status() !== 200) throw new Error(`Route ${r} returned ${resp?.status()}`);
  }

  // Verify /ira-dev content
  await p1440.goto(new URL("/ira-dev", baseUrl).toString(), { waitUntil: "domcontentloaded" });
  await p1440.waitForTimeout(600);
  const iraText = await p1440.locator("main").innerText();
  const hasBrandSpokesperson = /virtual executive.*brand spokesperson/i.test(iraText);
  const hasOwnerClaim = /ira dev\s*[·|]\s*owner|owner\s*[·|]\s*midshasum/i.test(iraText);
  await p1440.screenshot({ path: path.join(outDir, "phase2-ira-dev-1440.png"), fullPage: false });
  await ctx1440.close();

  // 3. Multi-viewport overflow & rendering check across all 6 required viewports
  const viewports = [
    [1920, 1080],
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [360, 800]
  ];
  const viewportChecks = {};
  for (const [width, height] of viewports) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const vpPage = await ctx.newPage();
    vpPage.on("pageerror", (e) => errors.push(`${width}x${height} pageerror: ${e.message}`));
    await vpPage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await vpPage.waitForTimeout(700);
    const overflow = await vpPage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    viewportChecks[`${width}x${height}`] = overflow;
    if (overflow.hasOverflow) {
      throw new Error(`Horizontal overflow at ${width}x${height}: ${JSON.stringify(overflow)}`);
    }
    if (width === 390 || width === 360) {
      await vpPage.screenshot({ path: path.join(outDir, `phase2-mobile-${width}.png`), fullPage: false });
    }
    await ctx.close();
  }

  // 4. Reduced-motion fallback check
  const ctxReduced = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const pReduced = await ctxReduced.newPage();
  pReduced.on("pageerror", (e) => errors.push(`reduced pageerror: ${e.message}`));
  await pReduced.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await pReduced.waitForTimeout(500);
  const fallbackVisible = await pReduced.locator(".spatial-universe__fallback").isVisible();
  await ctxReduced.close();

  const summary = {
    webglMetrics,
    environmentsVisited,
    sliderMoved,
    routeStatuses,
    hasBrandSpokesperson,
    hasOwnerClaim,
    viewportChecks,
    fallbackVisible,
    errors
  };
  await writeFile(path.join(outDir, "qa-summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (errors.length > 0 || !sliderMoved || !hasBrandSpokesperson || hasOwnerClaim) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
