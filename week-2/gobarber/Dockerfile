FROM node:12-alpine

WORKDIR /build

COPY . .

RUN npm install && npm run build

FROM node:12-alpine

WORKDIR /app

COPY --from=0 -r /build/dist /build/package*.json ./

RUN npm ci --only=production && \
  ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" > /etc/timezone

EXPOSE 3333
CMD ["node", "server.js"]
