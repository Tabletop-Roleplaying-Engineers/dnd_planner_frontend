FROM node:8-jessie

WORKDIR /usr/src/dnd-planner-web

COPY package.json ./
RUN yarn install
COPY . .

CMD yarn start:dev