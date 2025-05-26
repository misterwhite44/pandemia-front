# Projet MSPR 2

Application React développée avec :

* **Material-UI** pour l’interface utilisateur
* **Chart.js** pour les graphiques
* **Playwright** pour les tests end-to-end

## Installation

Cloner le projet, puis installer les dépendances :

```bash
npm install
```

## Lancement de l'application

```bash
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Tests end-to-end

Les tests sont réalisés avec **Playwright**. Pour les exécuter :

```bash
npx playwright test e2e
```

## Scripts disponibles

Dans le répertoire du projet, les scripts suivants sont disponibles :

### `npm start`

Lance l'application en mode développement.

### `npm test`

Lance les tests unitaires avec l'interface interactive de React.

### `npm run build`

Crée la version optimisée de l’application pour la production dans le dossier `build`.

### `npm run eject`

Déverrouille la configuration si besoin de personnaliser Webpack, Babel, ESLint, etc. **Action irréversible.**

## Configuration de l'environnement (.env)

Avant de lancer l'application, crée un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_API_KEY=ihYY5!PWWK96JzUw@E^wBKAbMT49s*eX&Pnvq*5


## Documentation complémentaire

* [Create React App – Documentation officielle](https://facebook.github.io/create-react-app/docs/getting-started)
* [React – Documentation officielle](https://reactjs.org/)
* [Playwright – Documentation officielle](https://playwright.dev/)


