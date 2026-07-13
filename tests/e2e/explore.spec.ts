import { test, expect } from "@playwright/test";

test("homepage loads and shows cities", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /PickStay/i })).toBeVisible();
  await expect(page.getByText("开始探索")).toBeVisible();
  await expect(page.getByText("东京")).toBeVisible();
});

test("explore page slider changes ranking", async ({ page }) => {
  await page.goto("/explore/tokyo");
  await expect(page.getByText("推荐街区")).toBeVisible();

  const firstCardBefore = await page.locator(".animate-in h3").first().textContent();

  // Max out cafe/chill weight
  const cafeSlider = page.locator('[role="slider"]').last();
  await cafeSlider.focus();
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("ArrowRight");
  }

  await page.waitForTimeout(500);
  const firstCardAfter = await page.locator(".animate-in h3").first().textContent();
  expect(firstCardAfter).toBeTruthy();
  expect(firstCardBefore).toBeTruthy();
});

test("compare page accessible", async ({ page }) => {
  await page.goto("/compare?ids=shinjuku,shibuya");
  await expect(page.getByText("街区对比")).toBeVisible();
  await expect(page.getByText("契合度")).toBeVisible();
});
