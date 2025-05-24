import { test, expect } from '@playwright/test';

test('Le dashboard se charge avec les graphiques', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('canvas')).toHaveCountGreaterThan(0); // Si tes composants chart.js utilisent des <canvas>
});
