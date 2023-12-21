import { NextFunction, Request, Response } from 'express';
import { AccountsService } from '../services/accounts.service'

export class AccountController {
  private accountsService: AccountsService;

  constructor(db: any) {
    this.accountsService = new AccountsService(db);
  }

  public async getAllAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await this.accountsService.getAllAccounts();

      res.status(200).json(admins);
    } catch (error) {
      console.error('Erreur lors de la récupération des comptes : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des comptes' });
      next(error);
    }
  }

  public async getAccountById(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.accountsService.getAccountById(req.params.mail);

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('Erreur lors de la récupération du compte : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du compte' });
      next(error);
    }
  }

  public async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.accountsService.createAccount(req.body);

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('Erreur lors de la création du compte : ', error);
      res.status(500).json({ error: 'Erreur lors de la création du compte' });
      next(error);
    }
  }

  public async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.accountsService.updateAccount(req.params.mail, req.body);

      res.status(200).json(admin);
    }
    catch (error) {
      console.error('Erreur lors de la mise à jour du compte : ', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du compte' });
      next(error);
    }
  }

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.accountsService.deleteAccount(req.params.mail);

      res.status(200).json(admin)
    }
    catch (error) {
      console.error('Erreur lors de la suppression du compte : ', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
      next(error);
    }
  }
}
