FROM --platform=linux/amd64 node:18-slim as build

WORKDIR /makdi

RUN mkdir -p /makdi/node_modules

COPY package*.json ./
COPY package-lock.json ./

COPY . .

RUN npm install --omit=dev

RUN npx pkg index.js -c package.json --targets node18-linux-x64 -o makdi-app

FROM --platform=linux/amd64 ubuntu:latest

COPY --from=build /makdi/makdi-app makdi-app

RUN apt-get update && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["./makdi-app"]