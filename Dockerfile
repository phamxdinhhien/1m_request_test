FROM node:18-alpine AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install
USER node

FROM node:18-alpine
WORKDIR /app
RUN chown -R node:node /app
COPY --chown=node:node package*.json yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json ./tsconfig.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules

USER node
EXPOSE 3000
CMD [ "yarn","start:dev"]






