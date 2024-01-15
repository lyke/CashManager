// eslint-disable-next-line import/no-extraneous-dependencies
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db4free.net',
  port: 3306,
  user: 'yvanyvan',
  password: 'yvanyvan',
  database: 'cash_manager',
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    connection.end();
  } else {
    console.log('Connecté à la base de données!');

    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS cash_manager_db';

    connection.query(createDatabaseQuery, (databaseError, databaseResults) => {
      if (databaseError) {
        console.error('Erreur lors de la création de la base de données : ', databaseError);
      } else {
        console.log('Base de données "cash_manager_db" créée avec succès :', databaseResults);

        const createTableProductsQuery = `
          CREATE TABLE IF NOT EXISTS product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            price DECIMAL(10, 2),
            category VARCHAR(255),
            image VARCHAR(255),
            description TEXT
          )
        `;

        const createTableAdminsQuery = `
          CREATE TABLE IF NOT EXISTS admin (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            password VARCHAR(255)
          )
        `;

        const createTableOrdersQuery = `
          CREATE TABLE IF NOT EXISTS \`order\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            \`desc\` VARCHAR(255)
          )
        `;

        connection.query(createTableProductsQuery, (tableError, tableResults) => {
          if (tableError) {
            console.error('Erreur lors de la création de la table product: ', tableError);
          } else {
            console.log('Table "product" créée avec succès :', tableResults);
          }

          connection.query(createTableAdminsQuery, (adminTableError, adminTableResults) => {
            if (adminTableError) {
              console.error('Erreur lors de la création de la table admin: ', adminTableError);
            } else {
              console.log('Table "admin" créée avec succès :', adminTableResults);
            }

            connection.query(createTableOrdersQuery, (orderTableError, orderTableResults) => {
              if (orderTableError) {
                console.error('Erreur lors de la création de la table order: ', orderTableError);
              } else {
                console.log('Table "order" créée avec succès :', orderTableResults);
              }

              connection.end();
            });
          });
        });
      }
    });
  }
});
