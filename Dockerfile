#  FROM node:16.19.0-alpine3.17
FROM node:20.11.0

WORKDIR /var/app/CommonBackend
COPY ./CommonBackend .
COPY . .
RUN npm install

WORKDIR /var/app/APIService
COPY ./ApiServices .
RUN npm install



RUN npm install typescript -g
RUN npm install -g nodemon
RUN npm install -g ts-node

CMD ["nodemon","index.ts"]




