FROM node:lts-alpine As development
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY . .
COPY --from=development /usr/src/app/dist ./dist

ENV TZ 'Asia/Ho_Chi_Minh'

CMD ["node", "dist/main.js"]
