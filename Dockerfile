FROM node:6-slim

RUN mkdir /plugins
COPY ./.babelrc /plugins
COPY ./index.html /plugins
COPY ./package.json /plugins
COPY ./webpack.config.js /plugins
COPY ./app/ /plugins/app/
COPY ./css/ /plugins/css/
WORKDIR /plugins

RUN npm install
RUN npm run deploy
