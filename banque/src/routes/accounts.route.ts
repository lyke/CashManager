import express, { Router } from 'express';
import { AccountController } from '../controllers/account.controller';

export class AccountsRoute {
  private api: Router = express.Router();
  private readonly accountController: AccountController;

  constructor(db: any) {
    this.accountController = new AccountController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.get(
      '/',
      this.accountController.getAllAccounts.bind(this.accountController)
    );

    this.api.get(
      '/:mail',
      this.accountController.getAccountById.bind(this.accountController));

    this.api.post(
      '/',
      this.accountController.createAccount.bind(this.accountController));

    this.api.put(
      '/:mail',
      this.accountController.updateAccount.bind(this.accountController));

    this.api.delete(
      '/:mail',
      this.accountController.deleteAccount.bind(this.accountController));
  }
}
