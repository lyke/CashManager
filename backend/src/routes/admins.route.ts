import express, { Router } from 'express'
import { AdminsController } from '../controllers/admins.controller'

export class AdminsRoute {
  private api: Router = express.Router();
  private readonly adminsController: AdminsController;

  constructor() {
    this.adminsController = new AdminsController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.get(
      '/',
      this.adminsController.getAllAdmins.bind(this.adminsController)
    );

    this.api.get(
      '/:id',
      this.adminsController.getAdminById.bind(this.adminsController));

    this.api.post(
      '/',
      this.adminsController.createAdmin.bind(this.adminsController));

    this.api.put(
      '/:id',
      this.adminsController.updateAdmin.bind(this.adminsController));

    this.api.delete(
      '/:id',
      this.adminsController.deleteAdmin.bind(this.adminsController));
  }
}
