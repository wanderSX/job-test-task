FROM node:6.9.1-onbuild

RUN npm -g install yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

#COPY . /usr/src/app
COPY package.json /usr/src/

EXPOSE 8080

RUN cd ../ && touch yarn.lock && yarn global add supervisor && yarn install --pure-lockfile
CMD ["yarn", "run",  "develop"]
