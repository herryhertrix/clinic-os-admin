import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Specify the directory where your tests are located
  testDir: './src',

  // Specify the file pattern for Playwright to recognize your test files
  testMatch: '**/*.spec.tsx',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
});