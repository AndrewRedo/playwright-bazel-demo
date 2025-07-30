import { test, expect } from "@playwright/test";

test.describe("Google Search Tests", () => {
  test("should load Google homepage", async ({ page }) => {
    await page.goto("https://google.com");
    
    // Wait for the page to load and check for Google logo or search box
    await expect(page).toHaveTitle(/Google/);
    
    // Check that the search input is visible
    const searchBox = page.locator('input[name="q"]');
    await expect(searchBox).toBeVisible();
  });

  test("should perform a basic search", async ({ page }) => {
    await page.goto("https://google.com");
    
    // Accept cookies if the dialog appears
    try {
      await page.locator('text="Accept all"').click({ timeout: 5000 });
    } catch {
      // Cookies dialog might not appear, continue
    }
    
    // Perform a search
    const searchBox = page.locator('input[name="q"]');
    await searchBox.fill("Playwright testing");
    await searchBox.press("Enter");
    
    // Wait for results and verify we're on the results page
    await page.waitForURL(/.*google\.com\/search.*/);
    await expect(page).toHaveTitle(/Playwright testing.*Google Search/);
    
    // Check that results are displayed
    const results = page.locator('#search');
    await expect(results).toBeVisible();
  });

  test("should verify basic page functionality", async ({ page }) => {
    await page.goto("https://google.com");
    
    // Test that we can navigate to images
    try {
      const imagesLink = page.locator('text="Images"');
      if (await imagesLink.isVisible()) {
        await imagesLink.click();
        await expect(page).toHaveURL(/.*google\.com\/imghp.*/);
      }
    } catch {
      // Images link might not be visible, that's okay
    }
    
    // Navigate back to main Google page
    await page.goto("https://google.com");
    await expect(page).toHaveTitle(/Google/);
  });
});