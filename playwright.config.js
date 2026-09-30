const { defineConfig } = require('@playwright/test');

const baseURL = process.env.VISUAL_BASE_URL || 'https://taielucile.github.io';

module.exports = defineConfig({
  testDir: './tests/visual',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL,
    browserName: 'chromium',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'en-US'
  }
});
