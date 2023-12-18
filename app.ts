import express from 'express';
import { ProductsRoute } from './backend/src/routes/products.route.ts';
import { OrdersRoute } from './backend/src/routes/orders.route.ts';
import mysql from 'mysql';
import { AdminsRoute } from './backend/src/routes/admins.route.ts';

const app = express();
const PORT = 5000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BoisdeCen2&*',
  database: 'cash_manager_db',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    process.exit(1);
  } else {
    console.log('Connecté à la base de données!');
  }
});

const productsRoute = new ProductsRoute(db);
const ordersRoute = new OrdersRoute(db);
const adminsRoute = new AdminsRoute(db);

app.use('/api/products', productsRoute.getRouter());
app.use('/api/orders', ordersRoute.getRouter());
app.use('/api/admins', adminsRoute.getRouter());

app.get('/', (req, res) => {
  res.send('Welcome to the Cash Manager API!');
  console.log("req", req);

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("IsWorking");
});
