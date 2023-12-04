import express, { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller';

export class OrdersRoute {
  private router: Router = express.Router();
  private readonly ordersController: OrdersController;

  constructor(db: any) {
    this.ordersController = new OrdersController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private routes(): void {
    this.router.get(
      '/',
      this.ordersController.getAllOrders.bind(this.ordersController)
    );

    this.router.get(
      '/:id',
      this.ordersController.getOrderById.bind(this.ordersController));

    this.router.post(
      '/',
      this.ordersController.createOrder.bind(this.ordersController));

    this.router.put(
      '/:id',
      this.ordersController.updateOrder.bind(this.ordersController));

    this.router.delete(
      '/:id',
      this.ordersController.deleteOrder.bind(this.ordersController));
  }
}
