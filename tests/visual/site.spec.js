const { test, expect } = require('@playwright/test');

const pages = [
  ['home', '/'],
  ['research', '/research.html'],
  ['writing', '/publications.html'],
  ['methods', '/methods.html'],
  ['news', '/news.html'],
  ['about', '/about.html'],
  ['cv', '/cv.html']
];

const viewports = [
  ['390', { width: 390, height: 844 }],
  ['768', { width: 768, height: 1024 }],
  ['1440', { width: 1440, height: 1000 }],
  ['1920', { width: 1920, height: 1080 }]
];

for (const [pageName, path] of pages) {
  for (const [widthName, viewport] of viewports) {
    test(`${pageName} @ ${widthName}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await expect(page.locator('body')).toHaveScreenshot(
        `${pageName}-${widthName}.png`,
        {
          fullPage: true,
          animations: 'disabled',
          caret: 'hide',
          scale: 'css',
          maxDiffPixelRatio: 0.01
        }
      );
    });
  }
}
