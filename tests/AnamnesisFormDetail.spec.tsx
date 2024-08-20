import { test, expect } from "@playwright/test";

test.describe("AnamnesisFormDetail", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Adjust the URL based on your setup
    await page.click("text=View >> nth=0");
  });

  test("should render form details", async ({ page }) => {
    await expect(page.locator("text=Family History")).toBeVisible();
    await expect(
      page.locator("text=Questions about your family's medical history")
    ).toBeVisible();
    await expect(page.locator("text=Section 1")).toBeVisible();
    await expect(
      page.locator(
        "text=Multiple choice: Does your family have a history of heart disease?"
      )
    ).toBeVisible();
  });

  test('should navigate back when "Back" button is clicked', async ({
    page,
  }) => {
    await page.click("text=Back");
    const formTitle = await page.textContent(
      "tbody tr:first-child td:first-child"
    );
    expect(formTitle).toBe("Family History");
  });
});

//npx playwright test tests/AnamnesisFormDetail.spec.tsx
