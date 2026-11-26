import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const outputDirectory = path.resolve("reports/stage-2");
const routes = [
  "/",
  "/about",
  "/research",
  "/technology",
  "/intelligence",
  "/ira-dev",
  "/contact",
  "/privacy",
  "/terms",
  "/disclosures"
];
const widths = [1920, 1440, 1024, 768, 390, 360];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"]
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  await mkdir(outputDirectory, { recursive: true });
  const results = [];

  for (const route of routes) {
    const response = await page.goto(new URL(route, baseUrl).toString(), {
      waitUntil: "commit",
      timeout: 30_000
    });
    await page.locator("main h1").waitFor({ timeout: 15_000 });
    const widthChecks = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: width <= 768 ? 844 : 900 });
      widthChecks.push(await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })));
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      for (const image of document.images) image.loading = "eager";
    });
    await Promise.race([
      page.evaluate(async () => {
        await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => undefined)));
      }),
      page.waitForTimeout(5_000)
    ]);
    const brokenImages = await page.locator("img").evaluateAll((images) =>
      images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src)
    );
    if (route === "/ira-dev") {
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        const step = Math.round(window.innerHeight * 0.65);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        for (let position = 0; position <= maxScroll; position += step) {
          window.scrollTo(0, position);
          await new Promise((resolve) => setTimeout(resolve, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);
    }
    await page.screenshot({
      path: path.join(outputDirectory, `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-desktop.jpg`),
      type: "jpeg",
      quality: 72,
      fullPage: true
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: path.join(outputDirectory, `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-mobile.jpg`),
      type: "jpeg",
      quality: 72,
      fullPage: true
    });

    results.push({
      route,
      status: response?.status(),
      widthChecks,
      imageCount: await page.locator("img").count(),
      brokenImages
    });
  }

  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "commit" });
  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();
  const menuExpanded = await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded");
  await page.keyboard.press("Escape");
  const menuClosed = await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "commit" });
  await page.waitForTimeout(400);
  const reducedMotionCanvasCount = await page.locator("canvas").count();
  const reducedMotionFallback = await page.locator(".spatial-fallback").count();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "commit" });
  await page.locator(".spatial-viewport canvas").waitFor({ state: "attached", timeout: 15_000 });
  const spatialCanvasCount = await page.locator(".spatial-viewport canvas").count();
  const contactFormFields = await page.goto(new URL("/contact", baseUrl).toString(), { waitUntil: "commit" })
    .then(() => page.locator("form input, form textarea, form select").count());
  const fallbackPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const fallbackPageErrors = [];
  fallbackPage.on("pageerror", (error) => fallbackPageErrors.push(error.message));
  await fallbackPage.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return originalGetContext.call(this, type, ...args);
    };
  });
  await fallbackPage.goto(new URL("/", baseUrl).toString(), { waitUntil: "commit" });
  await fallbackPage.waitForTimeout(1_000);
  const fallbackCanvasCount = await fallbackPage.locator(".spatial-viewport canvas").count();
  const fallbackBackdropCount = await fallbackPage.locator(".spatial-fallback").count();
  await fallbackPage.close();
  const report = {
    results,
    menuExpanded,
    menuClosed,
    reducedMotionCanvasCount,
    reducedMotionFallback,
    spatialCanvasCount,
    contactFormFields,
    fallbackCanvasCount,
    fallbackBackdropCount,
    fallbackPageErrors,
    pageErrors
  };
  console.log(JSON.stringify(report, null, 2));
  if (results.some((result) =>
    result.status !== 200 ||
    result.widthChecks.some((check) => check.overflow) ||
    result.brokenImages.length > 0
  )) {
    process.exitCode = 1;
  }
  if (
    menuExpanded !== "true" ||
    menuClosed !== "false" ||
    reducedMotionCanvasCount !== 0 ||
    reducedMotionFallback === 0 ||
    spatialCanvasCount === 0 ||
    contactFormFields < 4 ||
    fallbackBackdropCount === 0 ||
    fallbackPageErrors.length > 0 ||
    pageErrors.length > 0
  ) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
