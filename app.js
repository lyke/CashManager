// eslint-disable-next-line import/no-extraneous-dependencies
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BoisdeCen2&*',
  database: 'cash_manager_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
  } else {
    console.log('Connecté à la base de données!');

    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS cash_manager_db';

    connection.query(createDatabaseQuery, (databaseError, databaseResults) => {
      if (databaseError) {
        console.error('Erreur lors de la création de la base de données : ', databaseError);
      } else {
        console.log('Base de données "cash_manager_db" créée avec succès :', databaseResults);
      }

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS product (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          price DECIMAL(10, 2),
          image VARCHAR(255),
          description TEXT
        )
      `;

      connection.query(createTableQuery, (tableError, tableResults) => {
        if (tableError) {
          console.error('Erreur lors de la création de la table : ', tableError);
        } else {
          console.log('Table "product" créée avec succès :', tableResults);
        }

        connection.end();
      });
    });
  }
});
