import express from 'express';
import { TransactionRoute } from './routes/transaction.route';

const app = express();
const PORT = 5001;

app.use(express.json());

const adminsRoute = new TransactionRoute();

app.use('/api/transactions', adminsRoute.getRouter());

app.get('/', (req, res) => {
  res.send('Welcome to the Bank-route API!');
  console.log("req", req);

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
