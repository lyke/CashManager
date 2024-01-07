FROM node:18

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 5002

CMD ["npm", "start"]
