import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/e2e/**/*.spec.{js,ts}'], // adapte selon l’emplacement de tes tests
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev', // ou 'yarn dev' selon ton gestionnaire
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI, // évite de relancer si déjà démarré en local
  },
});
