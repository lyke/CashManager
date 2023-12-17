import express from 'express';
import { AdminsRoute } from './src/routes/admins.route';

const app = express();
const PORT = 5001;

app.use(express.json());

const adminsRoute = new AdminsRoute();

app.use('/api/admins', adminsRoute.getRouter());

app.get('/', (req, res) => {
  res.send('Welcome to the Bank-route API!');
  console.log("req", req);

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("IsWorking");
});
