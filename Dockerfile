FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE ${PORT}

CMD ["nodemon", "src/index.ts"]