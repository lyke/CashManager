import { OrdersDao } from '../dao/orders.dao';

export class OrdersService {
  private ordersDao: OrdersDao;

  constructor(db: any) {
    this.ordersDao = new OrdersDao(db);
  }

  public async getAllOrders() {
    return this.ordersDao.getAllOrders();
  }

  public async getOrderById(id: number) {
    return this.ordersDao.getOrderById(id);
  }

  public async createOrder(order: any) { // typer order
    return this.ordersDao.createOrder(order);
  }

  public async updateOrder(id: number, order: any) { // typer order
    return this.ordersDao.updateOrder(id, order);
  }

  public async deleteOrder(id: number) {
    return this.ordersDao.deleteOrder(id);
  }
}
