import { NextFunction, Request, Response } from 'express'

import { OrdersService } from '../services/orders.service'

export class OrdersController {
  private ordersService: OrdersService;

  constructor() {
    this.ordersService = new OrdersService();
  }

  public async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.ordersService.getAllOrders();

      res.status(200).json(orders);
    } catch (error) {
      console.error('OrdersController.getAllOrders - Erreur lors de la récupération des ordres : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des ordres' });
      next(error);
    }
  }

  public async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.ordersService.getOrderById(Number(req.params.id));

      res.status(200).json(order);
    }
    catch (error) {
      console.error('OrdersController.getOrderById - Erreur lors de la récupération du order : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du order' });
      next(error);
    }
  }

  public async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.ordersService.createOrder(req.body);

      res.status(200).json(order);
    }
    catch (error) {
      console.error('OrdersController.createOrder - Erreur lors de la création du order : ', error);
      res.status(500).json({ error: 'Erreur lors de la création du order' });
      next(error);
    }
  }

  public async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.ordersService.updateOrder(Number(req.params.id), req.body);

      res.status(200).json(order);
    }
    catch (error) {
      console.error('OrdersController.updateOrder - Erreur lors de la mise à jour du order : ', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du order' });
      next(error);
    }
  }

  public async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.ordersService.deleteOrder(Number(req.params.id));

      res.status(200).json(order)
    }
    catch (error) {
      console.error('OrdersController.deleteOrder - Erreur lors de la suppression du order : ', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du order' });
      next(error);
    }
  }
}
