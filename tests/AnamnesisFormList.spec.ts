import { test, expect } from "@playwright/test";

test.describe("AnamnesisFormList", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Replace with your app's URL
  });

  test("should display a list of forms", async ({ page }) => {
    const formTitle = await page.textContent(
      "tbody tr:first-child td:first-child"
    );
    expect(formTitle).toBe("Family History");
  });

  test("should filter forms based on search input", async ({ page }) => {
    await page.fill('input[placeholder="Search..."]', "General Health");
    const filteredForm = await page.textContent(
      "tbody tr:first-child td:first-child"
    );
    expect(filteredForm).toBe("Family History");
  });

  test("should sort forms by title", async ({ page }) => {
    await page.click('th:has-text("Title")');
    const sortedForm = await page.textContent(
      "tbody tr:first-child td:first-child"
    );
    expect(sortedForm).toBe("Nutrition");
  });

  test("should navigate through pagination", async ({ page }) => {
    await page.locator('button:text("Next")');
    const formTitle = await page.textContent(
      "tbody tr:first-child td:first-child"
    );

    expect(formTitle).toBe("Family History");
  });
});

// npx playwright test tests/AnamnesisFormList.spec.ts
