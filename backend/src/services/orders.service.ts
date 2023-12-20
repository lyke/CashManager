import * as mysql from 'mysql';

import { OrdersDao } from '../dao/orders.dao';
import { Order } from '../types/order';

export class OrdersService {
  private ordersDao: OrdersDao;

  constructor() {
    this.ordersDao = new OrdersDao();
  }

  public async getAllOrders() {
    return this.ordersDao.getAllOrders();
  }

  public async getOrderById(id: number) {
    return this.ordersDao.getOrderById(id);
  }

  public async createOrder(order: Order) {
    return this.ordersDao.createOrder(order);
  }

  public async updateOrder(id: number, order: Order) {
    return this.ordersDao.updateOrder(id, order);
  }

  public async deleteOrder(id: number) {
    return this.ordersDao.deleteOrder(id);
  }
}
