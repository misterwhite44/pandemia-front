# Étape 1 : Build React avec Node
FROM node:18 AS build

WORKDIR /app

# Récupération des arguments pour les variables d’environnement
ARG REACT_APP_API_KEY

# Rendre l’argument disponible pendant le build de React
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

COPY package*.json ./
RUN npm install

COPY . .

# Build avec variables intégrées
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier le build React dans le dossier public de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier la config personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
