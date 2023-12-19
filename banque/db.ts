// eslint-disable-next-line import/no-extraneous-dependencies
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BoisdeCen2&*',
  database: 'cash_manager_db'
})

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err)
    connection.end()
  } else {
    console.log('Connecté à la base de données!')

    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS cash_manager_db'

    connection.query(createDatabaseQuery, (databaseError, databaseResults) => {
      if (databaseError) {
        console.error('Erreur lors de la création de la base de données : ', databaseError)
      } else {
        console.log('Base de données "cash_manager_db" créée avec succès :', databaseResults)

        const createTableAccountQuery = `
          CREATE TABLE IF NOT EXISTS account (
            mail VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255),
            money DECIMAL(10, 2)
          )        `

        connection.query(createTableAccountQuery, (tableError, tableResults) => {
          if (tableError) {
            console.error('Erreur lors de la création de la table product: ', tableError)
          } else {
            console.log('Table "product" créée avec succès :', tableResults)
          }
          connection.end()
        })
      }

    })
  }
})
