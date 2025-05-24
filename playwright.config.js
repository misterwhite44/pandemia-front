import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/tests/**/*.spec.{js,ts,jsx,tsx}'], // uniquement les tests e2e
});
