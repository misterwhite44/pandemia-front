import { test, expect } from '@playwright/test';

test('La page d\'accueil se charge', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: "Bienvenue sur la page d'accueil" })).toBeVisible();
});
