import { test, expect } from "@playwright/test";

test.describe("UpdateAnamnesisForm", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Adjust the URL based on your setup
    await page.click("text=Edit"); // Assuming this navigates to the form creation page
  });

  test("should allow the user to update an anamnesis form with sections and questions", async ({
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

    // Add questions to the section
    await page.click("text=Add Question");
    await page.fill('input[placeholder="Question Text"]', "What is your age?");
    await page.selectOption("select", "Short text");

    await page.click("text=Add Question");
    await page.fill(
      'input[placeholder="Question Text"] >> nth=1',
      "Where do you live?"
    );
    await page.selectOption("select >> nth=1", "Short text");

    // Add another section and question
    await page.click("text=Add Section");
    await page.fill(
      'input[placeholder="Section Title"] >> nth=1',
      "Medical History"
    );
    await page.click("text=Add Question >> nth=2");
    await page.fill(
      'input[placeholder="Question Text"] >> nth=2',
      "Do you have any allergies?"
    );
    await page.selectOption("select >> nth=2", "Multiple choice");

    // Drag and drop a section to reorder
    const sourceSection = await page
      .locator('input[placeholder="Section Title"]')
      .nth(1);
    const targetSection = await page
      .locator('input[placeholder="Section Title"]')
      .nth(0);

    // Before drag
    const firstSourceSectionText = await sourceSection.evaluate(
      (node: any) => node.value
    );
    const secondSourceSectionText = await targetSection.evaluate(
      (node: any) => node.value
    );

    expect(firstSourceSectionText).toBe("Medical History");
    expect(secondSourceSectionText).toBe("General Questions");

    await sourceSection.dragTo(targetSection);

    // After drag
    const firstSectionText = await page
      .locator('input[placeholder="Section Title"]')
      .nth(0)
      .evaluate((node: any) => node.value);
    const secondSectionText = await page
      .locator('input[placeholder="Section Title"]')
      .nth(1)
      .evaluate((node: any) => node.value);

    expect(firstSectionText).toBe("General Questions");
    expect(secondSectionText).toBe("Medical History");

    // Drag and drop a question to reorder
    const sourceQuestion = await page
      .locator('input[placeholder="Question Text"]')
      .nth(1);
    const targetQuestion = await page
      .locator('input[placeholder="Question Text"]')
      .nth(0);

    // Before drag
    const firstSourceQuestionText = await sourceQuestion.evaluate(
      (node: any) => node.value
    );
    const secondSourceQuestionText = await targetQuestion.evaluate(
      (node: any) => node.value
    );

    expect(firstSourceQuestionText).toBe("Where do you live?");
    expect(secondSourceQuestionText).toBe("What is your age?");

    await sourceQuestion.dragTo(targetQuestion);

    // After drag
    const firstQuestionText = await page
      .locator('input[placeholder="Question Text"]')
      .nth(0)
      .evaluate((node: any) => node.value);
    const secondQuestionText = await page
      .locator('input[placeholder="Question Text"]')
      .nth(1)
      .evaluate((node: any) => node.value);

    expect(firstQuestionText).toBe("What is your age?");
    expect(secondQuestionText).toBe("Where do you live?");

    // Update the form
    await page.click("text=Update Form");

    // Verify form submission
    await expect(page.locator("text=New Anamnesis Form")).toBeVisible();
  });
});

// npx playwright test tests/UpdateAnamnesisForm.spec.ts
