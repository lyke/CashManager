import express, { Router } from 'express';
import { AdminsController } from '../controllers/admins.controller';
import { BankController } from '../controllers/bank.controller'

export class BankRoute {
  private api: Router = express.Router();
  private readonly bankController: BankController;

  constructor() {
    this.bankController = new BankController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.post(
      '/',
      this.bankController.getPaid.bind(this.bankController));
  }
}
