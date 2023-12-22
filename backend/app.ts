import express from 'express'
import { ProductsRoute } from './src/routes/products.route'
import { OrdersRoute } from './src/routes/orders.route'
import { AdminsRoute } from './src/routes/admins.route'
import { BankRoute } from './src/routes/bank.route'

const app = express();
const PORT = 5001;

app.use(express.json());

const productsRoute = new ProductsRoute();
const ordersRoute = new OrdersRoute();
const adminsRoute = new AdminsRoute();
const bankRoute = new BankRoute();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/products', productsRoute.getRouter());
app.use('/api/orders', ordersRoute.getRouter());
app.use('/api/admins', adminsRoute.getRouter());
app.use('/api/banque', bankRoute.getRouter());

app.get('/', (req, res) => {
  res.send('Welcome to the Cash Manager API!');
  console.log("req", req);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("IsWorking");
});