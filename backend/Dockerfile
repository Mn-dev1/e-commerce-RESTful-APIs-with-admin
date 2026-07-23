FROM node:26-alpine AS base

FROM base AS development
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]

FROM base AS build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /app
COPY package.json .
RUN npm i --only=production
COPY . .
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["npm", "start"]