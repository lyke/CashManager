import { OrdersDao } from '../dao/orders.dao';

export class OrdersService {
  private ordersDao: OrdersDao;

  constructor(db: any) {
    this.ordersDao = new OrdersDao(db);
  }

  public async getAllOrders() {
    return this.ordersDao.getAllOrders();
  }
}
