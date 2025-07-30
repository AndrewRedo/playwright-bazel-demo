import { test, expect } from "@playwright/test";

test.describe("Simple Tests", () => {
  test("should verify basic assertions work", async () => {
    // Test basic assertions
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
    expect("hello").toContain("ell");
    
    // Test array operations
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });

  test("should verify async operations work", async () => {
    // Test promise resolution
    const promise = Promise.resolve("success");
    await expect(promise).resolves.toBe("success");
    
    // Test timeout functionality
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 100));
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });

  test("should verify string operations", async () => {
    const testString = "Playwright Bazel Demo";
    
    expect(testString).toContain("Playwright");
    expect(testString).toContain("Bazel");
    expect(testString).toMatch(/^Playwright.*Demo$/);
    expect(testString.toLowerCase()).toBe("playwright bazel demo");
  });
});