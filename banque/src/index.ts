import express from 'express';
import mysql from 'mysql';
import { TransactionRoute } from './routes/transaction.route';
import { AccountsRoute } from './routes/accounts.route'

const app = express();
const PORT = 5002;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const db = mysql.createConnection({
  host: 'db4free.net',
      port: 3306,
      user: 'yvanyvan',
      password: 'yvanyvan',
      database: 'cash_manager',
});

db.connect((err: any) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    process.exit(1);
  } else {
    console.log('Connecté à la base de données!');
  }
});


const transactionRoute = new TransactionRoute(db);
const accountRoute = new AccountsRoute(db)

app.use('/api/transactions', transactionRoute.getRouter());
app.use('/api/accounts', accountRoute.getRouter());

app.get('/', (req: string, res) => {
  res.send('Welcome to the Bank-route API!');
  console.log("req", req);

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
