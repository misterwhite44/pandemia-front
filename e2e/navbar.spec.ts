import { test, expect } from '@playwright/test';

test('La navbar affiche tous les liens principaux', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dataset' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
});
