import { test, expect } from "@playwright/test";

test("homepage loads and shows cities", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /PickStay/i })).toBeVisible();
  await expect(page.getByText(/开始探索|Start exploring/i)).toBeVisible();
  await expect(page.getByText(/东京|Tokyo/i).first()).toBeVisible();
});

test("explore preset change updates top neighborhood id", async ({ page }) => {
  await page.goto("/explore/tokyo?preset=family");
  await expect(page.getByText(/推荐街区|Recommended/i)).toBeVisible();

  const firstCard = page.locator('[data-testid="neighborhood-card"]').first();
  await expect(firstCard).toBeVisible();
  const topBefore = await firstCard.getAttribute("data-neighborhood-id");
  expect(topBefore).toBeTruthy();

  await page.getByTestId("persona-nightOwl").click();
  await expect
    .poll(async () =>
      firstCard.getAttribute("data-neighborhood-id")
    )
    .not.toBe(topBefore);

  await expect(page.locator('[data-testid="match-drivers"]').first()).toBeVisible();
});

test("shareable weight URL restores ranking order", async ({ page }) => {
  await page.goto("/explore/tokyo?preset=chill");
  const sharedTop = await page
    .locator('[data-testid="neighborhood-card"]')
    .first()
    .getAttribute("data-neighborhood-id");

  await page.goto("/explore/tokyo?w=5,9,7,8,4,9,10");
  const restoredTop = await page
    .locator('[data-testid="neighborhood-card"]')
    .first()
    .getAttribute("data-neighborhood-id");

  expect(restoredTop).toBe(sharedTop);
});

test("compare page accessible", async ({ page }) => {
  await page.goto("/compare?ids=shinjuku,shibuya");
  await expect(page.getByText(/街区对比|Neighborhood comparison/i)).toBeVisible();
  await expect(page.getByText(/契合度|Match/i).first()).toBeVisible();
});
