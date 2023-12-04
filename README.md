# CASH-MANAGER - Fanny, Julie, Kevin, Timothée, Yvan

### Introduction

Welcome to the Cash Manager repository.

### Components

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com/fr/)
- [Nodemon](https://nodemon.io/)
- [Prettier](https://prettier.io/)
- [Typescript-eslint (airbnb rules)](https://github.com/typescript-eslint/typescript-eslint)

### Getting started

>The commands are available in package.json.

##### Starting server

    $ sudo mysql -u root -p
    ou
    $ mysql -u root -p

##### Eslint

To run Eslint on the src files :

    $ eslint "src/**/*.ts"

##### Prettier

This project use prettier as a code formatter.

To check which src files are not formatted with prettier run :

    $ prettier --check "src/**/*.ts"

To run prettier on all src files :

    $ prettier --write "src/**/*.ts"
