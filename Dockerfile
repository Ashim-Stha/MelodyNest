FROM node:18.19.1

WORKDIR /user/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run typeorm migration:run && npm run start:dev
