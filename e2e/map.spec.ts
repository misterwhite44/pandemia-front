import { test, expect } from '@playwright/test';

test('La carte des maladies est visible', async ({ page }) => {
  await page.goto('/map');
  await expect(page.getByRole('heading', { name: 'Carte Informative Globale sur les Maladies' })).toBeVisible();
});
