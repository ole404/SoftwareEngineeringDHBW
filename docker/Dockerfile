# === BUILD STAGE for CLIENT ===
FROM node:alpine AS client
WORKDIR /app

RUN npm install -g @ionic/cli

# The early copy of package.json enables docker-caching for node_modules which results in much faster build times!
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# === BUILD STAGE for SERVER ===
FROM node:alpine AS server
WORKDIR /app

# The early copy of package.json enables docker-caching for node_modules which results in much faster build times!
COPY server/package*.json ./
RUN npm install
COPY server .
RUN npm run build

# === PROD STAGE ===
FROM node:alpine
ARG PORT

COPY --from=client /app/www /app/www
COPY --from=server /app/node_modules /app/node_modules
COPY --from=server /app/dist /app
COPY --from=server /app/gcloud.json /app

WORKDIR /app
EXPOSE ${PORT}
CMD [ "node", "main.js" ]
