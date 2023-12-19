import express, { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

export class TransactionRoute {
  private api: Router = express.Router();
  private readonly usersController: TransactionController;

  constructor(db: any) {
    this.usersController = new TransactionController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.post(
      '/:mailToDebit/:mailToCredit/:amount',
      this.usersController.doTransaction.bind(this.usersController)
    );
  }
}
