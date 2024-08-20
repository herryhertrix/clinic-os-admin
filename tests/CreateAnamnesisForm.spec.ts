import { test, expect } from '@playwright/test';


test.describe('CreateAnamnesisForm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Adjust the URL based on your setup
    await page.click('text=Add')
  });


  test('should allow the user to create a new anamnesis form with sections and questions', async ({ page }: any) => {
    // Fill in the form title and description
    await page.fill('input[placeholder="Title"]', 'New Anamnesis Form');
    await page.fill('textarea[placeholder="Description"]', 'This is a description of the anamnesis form.');

    // Add a new section
    await page.click('text=Add Section');
    await page.fill('input[placeholder="Section Title"]', 'General Questions');

    // Add a new question to the section
    await page.click('text=Add Question');
    await page.fill('input[placeholder="Question Text"]', 'What is your age?');
    await page.selectOption('select', 'Short text');


    // Add another section and question
    await page.click('text=Add Section');
    await page.fill('input[placeholder="Section Title"] >> nth=1', 'Medical History');

    await page.click('text=Add Question >> nth=1');
    await page.fill('input[placeholder="Question Text"] >> nth=1', 'Where do you live?');
    await page.selectOption('select >> nth=1', 'Short text');
    
    await page.click('text=Add Question >> nth=1');
    await page.fill('input[placeholder="Question Text"] >> nth=2', 'Do you have any allergies?');
    await page.selectOption('select >> nth=2', 'Multiple choice');

    // Drag and drop a section to reorder 
    const sourceSection = await page.locator('input[placeholder="Section Title"]').nth(1);
    const targetSection = await page.locator('input[placeholder="Section Title"]').nth(0);

    const firstSourceSectionText = await sourceSection.evaluate(node => node.value);
    const secondSourceSectionText = await targetSection.evaluate(node => node.value);

    expect(firstSourceSectionText).toBe('Medical History'); // The text of the question that was dragged
    expect(secondSourceSectionText).toBe('General Questions'); // The original first question now should be second

    await sourceSection.dragTo(targetSection);

    // Verify that the section have been reordered
    const firstSection = await page.locator('input[placeholder="Section Title"]').nth(1);
    const secondSection = await page.locator('input[placeholder="Section Title"]').nth(0)

    const firstSectionText = await firstSection.evaluate(node => node.value);
    const secondSectionText = await secondSection.evaluate(node => node.value);

    expect(firstSectionText).toBe('Medical History'); // The text of the question that was dragged
    expect(secondSectionText).toBe('General Questions'); // The original first question now should be second


    // // Drag and drop a Question to reorder 
    // const sourceQuestion = await page.locator('input[placeholder="Question Text"]').nth(2);
    // const targetQuestion = await page.locator('input[placeholder="Question Text"]').nth(1);

    // const firstSourceQuestionText = await sourceQuestion.evaluate(node => node.value);
    // const secondSourceQuestionText = await targetQuestion.evaluate(node => node.value)

    // expect(firstSourceQuestionText).toBe('Do you have any allergies?'); // The text of the question that was dragged
    // expect(secondSourceQuestionText).toBe('Where do you live?'); // The original first question now should be second

    // await targetQuestion.dragTo(sourceQuestion);

    // // Verify that the Question have been reordered
    // const firstQuestion = await page.locator('input[placeholder="Question Text"]').nth(2);
    // const secondQuestion = await page.locator('input[placeholder="Question Text"]').nth(1);

    // const firstQuestionText = await firstQuestion.evaluate(node => node.value);
    // const secondQuestionText = await secondQuestion.evaluate(node => node.value);

    // expect(firstQuestionText).toBe('Do you have any allergies?'); // The text of the question that was dragged
    // expect(secondQuestionText).toBe('Where do you live?'); // The original first question now should be second


    // Submit the form
    await page.click('text=Create Form');
    await expect(page.locator('text=Family History')).toBeVisible();
  });
});

// npx playwright test tests/CreateAnamnesisForm.spec.ts