FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY .  /usr/src/app
RUN npm install
RUN npm start
EXPOSE 8080
CMD ["npm", "start"]