FROM node:lts-alpine
WORKDIR /web
COPY package.json .pnp.cjs .yarnrc.yml ./
COPY .yarn/releases/yarn-3.2.1.cjs .yarn/releases/
RUN yarn && yarn add create-react-app
COPY . .
EXPOSE 3000
CMD yarn start
