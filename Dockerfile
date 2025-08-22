FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Définir les variables d'environnement pour l'authentification npm
ARG NPM_AUTH_TOKEN
ARG NPM_AUTH_EMAIL

ENV NPM_AUTH_TOKEN=$NPM_AUTH_TOKEN
ENV NPM_AUTH_EMAIL=$NPM_AUTH_EMAIL

# Copier les fichiers de dépendances
COPY package*.json ./

# Créer le fichier `.npmrc` pour inclure les configurations d'authentification du registre npm
RUN echo "email=${NPM_AUTH_EMAIL}" > /app/.npmrc && \
    echo "always-auth=true" >> /app/.npmrc && \
    echo "registry=https://cegid.jfrog.io/artifactory/api/npm/all-npm/" >> /app/.npmrc && \
    echo "//cegid.jfrog.io/artifactory/api/npm/all-npm/:_authToken=${NPM_AUTH_TOKEN}" >> /app/.npmrc && \
    echo "//cegid.jfrog.io/artifactory/api/npm/aca-npm-all/:_authToken=${NPM_AUTH_TOKEN}" >> /app/.npmrc && \
    echo "//cegid.jfrog.io/cegid/api/npm/all-npm/:_authToken=${NPM_AUTH_TOKEN}" >> /app/.npmrc && \
    echo "//cegid.jfrog.io/cegid/api/npm/yupana-npm/:_authToken=${NPM_AUTH_TOKEN}" >> /app/.npmrc && \
    echo "//cegid.jfrog.io/cegid/api/npm/loop-npm/:_authToken=${NPM_AUTH_TOKEN}" >> /app/.npmrc && \
    echo "public-hoist-pattern[]=pdfjs-dist" >> /app/.npmrc && \
    npm ci

# Copier tout le code source
COPY . .

# Builder le storybook (cela va créer le dossier storybook-static)
RUN npm run build-storybook

# Installer http-server globalement
RUN npm install -g http-server

# Exposer le port
EXPOSE 3000

# Servir les fichiers depuis storybook-static
CMD http-server storybook-static -p 3000