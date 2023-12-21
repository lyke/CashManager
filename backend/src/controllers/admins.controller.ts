import { NextFunction, Request, Response } from 'express';
import * as mysql from 'mysql';

import { AdminsService } from '../services/admins.service';

export class AdminsController {
  private adminsService: AdminsService;

  constructor() {
    this.adminsService = new AdminsService();
  }

  public async getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await this.adminsService.getAllAdmins();

      res.status(200).json(admins);
    } catch (error) {
      console.error('AdminsController.getAllAdmins - Erreur lors de la récupération des ordres : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des ordres' });
      next(error);
    }
  }

  public async getAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminsService.getAdminById(Number(req.params.id));

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('AdminsController.getAdminById - Erreur lors de la récupération du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
      next(error);
    }
  }

  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminsService.createAdmin(req.body);

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('AdminsController.createAdmin - Erreur lors de la création du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la création du produit' });
      next(error);
    }
  }

  public async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminsService.updateAdmin(Number(req.params.id), req.body);

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('AdminsController.updateAdmin - Erreur lors de la mise à jour du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
      next(error);
    }
  }

  public async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminsService.deleteAdmin(Number(req.params.id));

      res.status(200).json(admin)
    }
    catch (error) {
      console.error('AdminsController.deleteAdmin - Erreur lors de la suppression du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
      next(error);
    }
  }
}
