import express, { Router } from 'express';
import { AccountController } from '../controllers/account.controller';

export class AdminsRoute {
  private api: Router = express.Router();
  private readonly adminsController: AccountController;

  constructor(db: any) {
    this.adminsController = new AccountController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.get(
      '/',
      this.adminsController.getAllAccounts.bind(this.adminsController)
    );

    this.api.get(
      '/:id',
      this.adminsController.getAccountById.bind(this.adminsController));

    this.api.post(
      '/',
      this.adminsController.createAccount.bind(this.adminsController));

    this.api.put(
      '/:id',
      this.adminsController.updateAccount.bind(this.adminsController));

    this.api.delete(
      '/:id',
      this.adminsController.deleteAccount.bind(this.adminsController));
  }
}
