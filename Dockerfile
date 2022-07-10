FROM node:alpine
COPY ./backend/ /app

WORKDIR /app
CMD node index.js
