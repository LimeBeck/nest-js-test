FROM node:16-alpine3.14

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . /src

RUN yarn build

CMD ["yarn", "start:prod"]

EXPOSE 5000