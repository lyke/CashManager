import express, { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

export class TransactionRoute {
  private api: Router = express.Router();
  private readonly transactionController: TransactionController;

  constructor(db: any) {
    this.transactionController = new TransactionController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.post(
      '/',
      this.transactionController.doTransaction.bind(this.transactionController)
    );
  }
}
