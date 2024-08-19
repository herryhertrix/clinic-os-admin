import { test, expect } from '@playwright/test';

test('Create a new anamnesis form', async ({ page }) => {
  await page.goto('/create');
  await page.fill('input[name="title"]', 'New Form');
  await page.fill('textarea[name="description"]', 'Form Description');
  await page.click('text=Add Section');
  await page.fill('input[name="section-title"]', 'Section 1');
  await page.click('text=Create Form');
  expect(await page.textContent('h1')).toContain('Form List');
});