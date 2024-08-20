import { test, expect } from "@playwright/test";

test.describe("CreateAnamnesisForm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Adjust the URL based on your setup
    await page.click("text=Add");
  });

  test("should allow the user to create a new anamnesis form with sections and questions", async ({
    page,
  }: any) => {
    // Fill in the form title and description
    await page.fill('input[placeholder="Title"]', "New Anamnesis Form");
    await page.fill(
      'textarea[placeholder="Description"]',
      "This is a description of the anamnesis form."
    );

    // Add a new section
    await page.click("text=Add Section");
    await page.fill('input[placeholder="Section Title"]', "General Questions");

    // Add a new question to the section
    await page.click("text=Add Question");
    await page.fill('input[placeholder="Question Text"]', "What is your age?");
    await page.selectOption("select", "Short text");

    // Add another section and question
    await page.click("text=Add Section");
    await page.fill(
      'input[placeholder="Section Title"] >> nth=1',
      "Medical History"
    );

    await page.click("text=Add Question >> nth=1");
    await page.fill(
      'input[placeholder="Question Text"] >> nth=1',
      "Where do you live?"
    );
    await page.selectOption("select >> nth=1", "Short text");

    await page.click("text=Add Question >> nth=1");
    await page.fill(
      'input[placeholder="Question Text"] >> nth=2',
      "Do you have any allergies?"
    );
    await page.selectOption("select >> nth=2", "Multiple choice");

    // Submit the form
    await page.click("text=Create Form");
    await expect(page.locator("text=Family History")).toBeVisible();
  });
});

// npx playwright test tests/CreateAnamnesisForm.spec.ts
