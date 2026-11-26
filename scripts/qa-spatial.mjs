import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const outputDirectory = path.resolve("reports/spatial-rebuild");
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"]
});
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1
});
const errors = [];
page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

try {
  await mkdir(outputDirectory, { recursive: true });
  const response = await page.goto(new URL("/", baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 45_000
  });
  if (response?.status() !== 200) throw new Error(`Homepage returned HTTP ${response?.status()}.`);

  const canvas = page.locator(".spatial-universe canvas");
  await canvas.waitFor({ state: "attached", timeout: 30_000 });
  await page.waitForFunction(
    () => {
      const element = document.querySelector(".spatial-universe canvas");
      return element?.dataset.environment === "core" && Number(element.dataset.triangles) > 0;
    },
    undefined,
    { timeout: 30_000 }
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);

  const initial = await canvas.evaluate((element) => ({
    width: element.width,
    height: element.height,
    webgl: element.dataset.webgl,
    core: element.dataset.spatialCore,
    environment: element.dataset.environment,
    triangles: Number(element.dataset.triangles),
    drawCalls: Number(element.dataset.drawCalls),
    cameraX: Number(element.dataset.cameraX),
    cameraY: Number(element.dataset.cameraY),
    cameraZ: Number(element.dataset.cameraZ)
  }));
  if (!initial.webgl?.includes("WebGL") || initial.triangles <= 0 || initial.drawCalls <= 0) {
    throw new Error(`The browser did not render WebGL geometry: ${JSON.stringify(initial)}`);
  }

  await page.screenshot({
    path: path.join(outputDirectory, "home-desktop-webgl.png"),
    fullPage: false,
    animations: "disabled"
  });

  const canvasBounds = await canvas.boundingBox();
  if (!canvasBounds) throw new Error("The WebGL canvas has no visible bounds.");
  await page.mouse.move(
    canvasBounds.x + canvasBounds.width * 0.94,
    canvasBounds.y + canvasBounds.height * 0.38
  );
  await page.waitForTimeout(700);
  const afterPointer = await canvas.evaluate((element) => ({
    pointerX: Number(element.dataset.pointerX),
    cameraX: Number(element.dataset.cameraX),
    cameraY: Number(element.dataset.cameraY)
  }));
  const cameraResponded =
    Math.abs(afterPointer.cameraX - initial.cameraX) > 0.025 ||
    Math.abs(afterPointer.cameraY - initial.cameraY) > 0.025;
  if (Math.abs(afterPointer.pointerX) < 0.1 || !cameraResponded) {
    throw new Error(`Pointer parallax was not observed: ${JSON.stringify({ initial, afterPointer })}`);
  }

  const sectionBounds = await page.locator("[data-testid='spatial-universe']").evaluate((element) => ({
    top: element.getBoundingClientRect().top + window.scrollY,
    height: element.getBoundingClientRect().height
  }));
  const scrollDistance = Math.max(sectionBounds.height - await page.evaluate(() => window.innerHeight), 1);
  const environmentProof = [];
  for (const [index, environment] of ["core", "research", "architecture", "intelligence", "outlook"].entries()) {
    const progress = index === 4 ? 0.98 : index / 4;
    await page.evaluate(
      ({ top, distance, position }) => window.scrollTo(0, top + distance * position),
      { top: sectionBounds.top, distance: scrollDistance, position: progress }
    );
    await page.waitForFunction(
      (expected) => document.querySelector(".spatial-universe canvas")?.dataset.environment === expected,
      environment,
      { timeout: 10_000 }
    );
    await page.waitForTimeout(350);
    const metrics = await canvas.evaluate((element) => ({
      environment: element.dataset.environment,
      progress: Number(element.dataset.scrollProgress),
      cameraX: Number(element.dataset.cameraX),
      cameraZ: Number(element.dataset.cameraZ),
      triangles: Number(element.dataset.triangles)
    }));
    environmentProof.push(metrics);
    if (metrics.triangles <= 0) throw new Error(`The ${environment} environment rendered no geometry.`);
    if (environment !== "core") {
      await page.screenshot({
        path: path.join(outputDirectory, `environment-${environment}.png`),
        fullPage: false,
        animations: "disabled"
      });
    }
  }
  const scrollChangedPerspective = Math.abs(environmentProof[2].cameraZ - initial.cameraZ) > 0.05;
  if (!scrollChangedPerspective) throw new Error("Scroll did not change the spatial camera perspective.");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1_200);
  const mobile = await canvas.evaluate((element) => ({
    width: element.width,
    height: element.height,
    webgl: element.dataset.webgl,
    environment: element.dataset.environment,
    triangles: Number(element.dataset.triangles)
  }));
  if (!mobile.webgl?.includes("WebGL") || mobile.triangles <= 0) {
    throw new Error(`The mobile scene did not render: ${JSON.stringify(mobile)}`);
  }
  await page.screenshot({
    path: path.join(outputDirectory, "home-mobile-webgl.png"),
    fullPage: false,
    animations: "disabled"
  });

  const researchPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  researchPage.on("pageerror", (error) => errors.push(`research pageerror: ${error.message}`));
  researchPage.on("console", (message) => {
    if (message.type() === "error") errors.push(`research console: ${message.text()}`);
  });
  const researchResponse = await researchPage.goto(new URL("/research", baseUrl).toString(), {
    waitUntil: "commit",
    timeout: 45_000
  });
  if (researchResponse?.status() !== 200) {
    throw new Error(`Research page returned HTTP ${researchResponse?.status()}.`);
  }
  await researchPage.locator("main h1").waitFor({ timeout: 20_000 });
  const researchTitle = await researchPage.locator("main h1").innerText();
  await researchPage.locator(".spatial-viewport canvas").waitFor({ state: "attached", timeout: 20_000 });
  await researchPage.close();

  const report = {
    homepageStatus: response.status(),
    webgl: initial.webgl,
    core: initial.core,
    initial,
    afterPointer,
    cameraResponded,
    environmentProof,
    scrollChangedPerspective,
    mobile,
    researchTitle,
    errors
  };
  await writeFile(path.join(outputDirectory, "qa-evidence.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  if (errors.length > 0) process.exitCode = 1;
} finally {
  await browser.close();
}
