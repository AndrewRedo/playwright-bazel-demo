import { test } from "@playwright/test";

test("should load Google homepage", async ({ page }) => {
  await page.goto("https://google.com");
});
