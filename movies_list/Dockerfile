FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .
COPY movies.txt .

EXPOSE 3000

CMD ["node", "server.js"]
