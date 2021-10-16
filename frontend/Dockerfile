FROM node:16.11

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
