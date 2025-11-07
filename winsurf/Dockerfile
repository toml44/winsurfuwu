# Étape de construction
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Génération du client Prisma et construction de l'application
RUN npx prisma generate
RUN npm run build

# Étape d'exécution
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV production

# Copie des fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
