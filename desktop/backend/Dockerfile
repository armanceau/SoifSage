FROM node:18

RUN apt update && apt install -y curl netcat-traditional

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src .

EXPOSE 3001

CMD ["node", "server.js"]