import express, { Router } from 'express';
import { AdminsController } from '../controllers/admins.controller';

export class AdminsRoute {
  private router: Router = express.Router();
  private readonly adminsController: AdminsController;

  constructor(db: any) {
    this.adminsController = new AdminsController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private routes(): void {
    this.router.get(
      '/',
      this.adminsController.getAllAdmins.bind(this.adminsController)
    );

    this.router.get(
      '/:id',
      this.adminsController.getAdminById.bind(this.adminsController));

    this.router.post(
      '/',
      this.adminsController.createAdmin.bind(this.adminsController));

    this.router.put(
      '/:id',
      this.adminsController.updateAdmin.bind(this.adminsController));

    this.router.delete(
      '/:id',
      this.adminsController.deleteAdmin.bind(this.adminsController));
  }
}
