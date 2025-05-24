import { test, expect } from '@playwright/test';

test('Le dashboard se charge avec les graphiques', async ({ page }) => {
  await page.goto('/dashboard');
  // Attend qu'au moins un canvas soit visible (pour Chart.js)
  await expect(page.locator('canvas')).toHaveCount(1, { timeout: 10000 });
  // Vérifie qu'il y a au moins un canvas (au cas où il y en aurait plusieurs)
  const canvasCount = await page.locator('canvas').count();
  expect(canvasCount).toBeGreaterThan(0);
});