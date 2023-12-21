FROM node:14

COPY package*.json /app/

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
