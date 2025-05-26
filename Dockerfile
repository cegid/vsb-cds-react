FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port Storybook
EXPOSE 6006

# Exécuter Storybook en mode développement
CMD ["npm", "run", "storybook", "--", "--host", "0.0.0.0", "--ci"]