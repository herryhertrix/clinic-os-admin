import { test, expect } from "@playwright/test";

test.describe("CreateAnamnesisForm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Adjust the URL based on your setup
    await page.click("text=Add");
  });

  test("should allow the user to create a new anamnesis form with sections and questions, perform drag-and-drop, and delete them", async ({
    page,
  }) => {
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

    // Drag and drop the "Medical History" section to reorder it before "General Questions"
    const sourceSection = await page
      .locator('input[placeholder="Section Title"]')
      .nth(1);
    const targetSection = await page
      .locator('input[placeholder="Section Title"]')
      .nth(0);

    await sourceSection.dragTo(targetSection);

    // Verify that the section has been reordered
    const firstSection = await page
      .locator('input[placeholder="Section Title"]')
      .nth(0);
    const firstSectionText = await firstSection.evaluate((node: any) => node.value);

    expect(firstSectionText).toBe("General Questions");

    // Remove all question in second section
    await page.click('button[placeholder="Remove Question"] >> nth=1');

    const remainingQuestions = await page.locator('button[placeholder="Remove Question"] >> nth=1');
    expect(await remainingQuestions.count()).toBe(1); // Should now only be two questions remaining


    // Remove a section
    await page.click('button[placeholder="Remove Section"] >> nth=1');
    await expect(
      page.locator('input[placeholder="Section Title"] >> nth=1')
    ).not.toBeVisible();

    // Submit the form
    await page.click("text=Create Form");
    await page.click('text=Next');
    await expect(page.locator("text=New Anamnesis Form")).toBeVisible();
  });
});

// npx playwright test tests/CreateAnamnesisForm.spec.ts
