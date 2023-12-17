import express, { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

export class TransactionRoute {
  private api: Router = express.Router();
  private readonly usersController: TransactionController;

  constructor() {
    this.usersController = new TransactionController(null);
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.post(
      '/:idToDebit/:idToCredit/:amount',
      this.usersController.doTransaction.bind(this.usersController)
    );
  }
}
