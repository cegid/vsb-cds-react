FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY .npmrc ./

# Installer les dépendances du projet
RUN npm ci

# Copier tout le code source
COPY . .

# Builder le storybook (cela va créer le dossier storybook-static)
RUN npm run build-storybook

# Installer http-server globalement
RUN npm install -g http-server

# Exposer le port pour Heroku
EXPOSE $PORT

# Servir les fichiers depuis storybook-static avec le port dynamique d'Heroku
CMD http-server storybook-static -p $PORT