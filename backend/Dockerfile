FROM node:18

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 5001

CMD ["npm", "start"]
