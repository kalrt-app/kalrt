/**
 * Capture screenshots of KALRT dashboard for landing page
 * Run: node scripts/capture-screenshots.js
 */

const { chromium } = require('playwright');
const path = require('path');

const PAGES = [
  { url: '/app', name: 'dashboard', waitFor: '.Polaris-Page' },
  { url: '/app/back-in-stock', name: 'back-in-stock', waitFor: '.Polaris-Page' },
  { url: '/app/preorder', name: 'preorder', waitFor: '.Polaris-Page' },
  { url: '/app/wishlist', name: 'wishlist', waitFor: '.Polaris-Page' },
  { url: '/app/low-stock', name: 'low-stock', waitFor: '.Polaris-Page' },
  { url: '/app/analytics', name: 'analytics', waitFor: '.Polaris-Page' },
  { url: '/app/templates', name: 'templates', waitFor: '.Polaris-Page' },
  { url: '/app/settings', name: 'settings', waitFor: '.Polaris-Page' },
];

const BASE_URL = 'http://localhost:5177';
const OUTPUT_DIR = path.join(__dirname, '../public/images/screenshots');

async function captureScreenshots() {
  console.log('Starting screenshot capture...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina quality
  });
  const page = await context.newPage();

  for (const { url, name, waitFor } of PAGES) {
    try {
      console.log(`Capturing: ${name}...`);
      await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });

      // Wait for content to load
      await page.waitForSelector(waitFor, { timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(500); // Extra time for animations

      // Capture full page
      const screenshotPath = path.join(OUTPUT_DIR, `${name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });
      console.log(`  Saved: ${screenshotPath}`);

    } catch (error) {
      console.error(`  Error capturing ${name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to public/images/screenshots/');
}

captureScreenshots().catch(console.error);
