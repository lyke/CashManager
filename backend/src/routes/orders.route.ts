import express, { Router } from 'express'
import { OrdersController } from '../controllers/orders.controller'

export class OrdersRoute {
  private api: Router = express.Router();
  private readonly ordersController: OrdersController;

  constructor() {
    this.ordersController = new OrdersController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.get(
      "/",
      this.ordersController.getAllOrders.bind(this.ordersController)
    );

    this.api.get(
      '/:id',
      this.ordersController.getOrderById.bind(this.ordersController));

    this.api.post(
      '/',
      this.ordersController.createOrder.bind(this.ordersController));

    this.api.put(
      '/:id',
      this.ordersController.updateOrder.bind(this.ordersController));

    this.api.delete(
      '/:id',
      this.ordersController.deleteOrder.bind(this.ordersController));
  }
}
