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

##### SetUp MySQL server

create the database and run the insertion script.

- connect to mysql `sudo mysql -u root -p`
- change authentication method and create database
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BoisdeCen2&*';
CREATE DATABASE cash_manager_db;
```
- run `node db.ts` 

##### Eslint

To run Eslint on the src files :

    $ eslint "src/**/*.ts"

##### Prettier

This project use prettier as a code formatter.

To check which src files are not formatted with prettier run :

    $ prettier --check "src/**/*.ts"

To run prettier on all src files :

    $ prettier --write "src/**/*.ts"
