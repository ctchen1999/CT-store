FROM node:22

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]