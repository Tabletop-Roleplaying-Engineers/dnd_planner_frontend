FROM node:carbon

WORKDIR /usr/src/dnd-planner-api

COPY package*.json ./
RUN yarn install
COPY . .

CMD yarn start