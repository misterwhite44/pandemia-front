# Test info

- Name: Le dashboard se charge avec les graphiques
- Location: C:\Users\Louis\Documents\pandemia-front\e2e\dashboard.spec.ts:3:5

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toHaveCount(expected)

Locator: locator('canvas')
Expected: 1
Received: 6
Call log:
  - expect.toHaveCount with timeout 10000ms
  - waiting for locator('canvas')
    2 × locator resolved to 0 elements
      - unexpected value "0"
    - locator resolved to 2 elements
    - unexpected value "2"
    10 × locator resolved to 6 elements
       - unexpected value "6"

    at C:\Users\Louis\Documents\pandemia-front\e2e\dashboard.spec.ts:6:40
```

# Page snapshot

```yaml
- banner:
  - heading "Mon Application" [level=6]
  - link "Accueil":
    - /url: /
    - paragraph: Accueil
  - link "Dashboard":
    - /url: /dashboard
    - paragraph: Dashboard
  - link "Dataset":
    - /url: /dataset
    - paragraph: Dataset
  - link "API":
    - /url: /api
    - paragraph: API
  - link "Carte":
    - /url: /map
    - button
  - link "IA":
    - /url: /ia
    - button
  - link "Profil":
    - /url: /profile
    - button
  - button
- img
- heading "Nombre total de morts par pays et par maladie" [level=3]
- text: Choisir une maladie
- combobox "Choisir une maladie": COVID-19
- img
- heading "Pays les plus touchés par le Covid-19" [level=3]
- img
- heading "Pays les plus touchés par le Monkeypox" [level=3]
- img
- heading "Nombre total de cas guéris (par pays et maladie)" [level=3]
- img
- heading "Pays les plus touchés quotidiennement" [level=3]
- text: Choisir une maladie
- combobox "Choisir une maladie": COVID-19
- img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Le dashboard se charge avec les graphiques', async ({ page }) => {
   4 |   await page.goto('/dashboard');
   5 |   // Attend qu'au moins un canvas soit visible (pour Chart.js)
>  6 |   await expect(page.locator('canvas')).toHaveCount(1, { timeout: 10000 });
     |                                        ^ Error: Timed out 10000ms waiting for expect(locator).toHaveCount(expected)
   7 |   // Vérifie qu'il y a au moins un canvas (au cas où il y en aurait plusieurs)
   8 |   const canvasCount = await page.locator('canvas').count();
   9 |   expect(canvasCount).toBeGreaterThan(0);
  10 | });
```