FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./build ./build

EXPOSE 3000

CMD [ "npm", "start" ]
