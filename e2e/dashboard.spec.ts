import { test, expect } from '@playwright/test';

test('Le dashboard se charge avec les graphiques', async ({ page }) => {
  await page.goto('/dashboard'); // ou la route exacte

  await page.waitForSelector('canvas', { state: 'visible' });

await expect(page.locator('text=Dashboard').first()).toBeVisible();

  const canvasCount = await page.locator('canvas').count();
  expect(canvasCount).toBeGreaterThan(0);
});