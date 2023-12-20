import express from 'express'
import { ProductsRoute } from './src/routes/products.route'
import { OrdersRoute } from './src/routes/orders.route'
import { AdminsRoute } from './src/routes/admins.route'

const app = express();
const PORT = 5000;

app.use(express.json());

const productsRoute = new ProductsRoute();
const ordersRoute = new OrdersRoute();
const adminsRoute = new AdminsRoute();

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
