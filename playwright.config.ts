import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/e2e/**/*.spec.{js,ts}'], // adapte selon l’emplacement de tes tests
  use: {
    baseURL: 'http://localhost:3000',
  },
  // Retire la section webServer si tu démarres déjà le serveur dans le workflow CI/CD
  // Sinon, décommente et adapte la commande ci-dessous si tu veux que Playwright gère le serveur
  /*
  webServer: {
    command: 'serve -s build -l 3000', // ou 'npm run dev' si tu utilises un serveur de dev
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  */
});