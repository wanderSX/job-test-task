FROM node:6.9.1-onbuild

RUN npm -g install yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/
COPY yarn.lock /usr/src/


RUN yarn global add webpack@2.2.0

RUN cd ../ && yarn install --pure-lockfile

CMD ["yarn", "run",  "develop"]