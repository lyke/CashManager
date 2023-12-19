# Bank-route - Fanny, Julie, Kevin, Timothée, Yvan

### Getting started

#### SetUp MySQL server

create the database and run the insertion script.

- connect to mysql `sudo mysql -u root -p`
- change authentication method and create database
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BoisdeCen2&*';
CREATE DATABASE cash_manager_db;
```
- run `node db.ts`

#### Start server

run `npm run start`
