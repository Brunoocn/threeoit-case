FROM node:alpine

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn start:dev

CMD ["yarn", "start:dev"]