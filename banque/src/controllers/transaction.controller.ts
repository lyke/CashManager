import { NextFunction, Request, Response } from 'express';
import { AccountsService } from '../services/accounts.service';

export class TransactionController {
  private usersService: AccountsService;

  constructor(db: any) {
    this.usersService = new AccountsService(db);
  }

  public async doTransaction(req: Request, res: Response, next: NextFunction) {
    let mailToDebit = req.body.mailToDebit
    let mailToCredit = req.body.mailToCredit
    let amount = Number(req.body.amount)

    console.log(amount+" "+mailToDebit+" "+mailToCredit)
    console.log(req.body)
    try {
      if ( ! await this.usersService.getAccountById(mailToCredit) || ! await this.usersService.getAccountById(mailToDebit)){
        res.status(404).json({error: "unkown email"})
        next("this email does not correspond to an account")
        return
      }

      if (await this.usersService.removeFromAccount(mailToDebit, amount)){
        this.usersService.addToAccount(mailToCredit, amount)
        res.status(200).json({message: "transaction completed"})
      } else {
        res.status(409).json({error: "debit account has no enough money to complete the transaction"})
        next("debit account has no enough money to complete the transaction")
      }
    }
    catch (error){
      console.error('Erreur lors de la transaction : ', error);
      res.status(500).json({error: "erreur lors de la transaction"})
      next(error)
    }
  }
}
