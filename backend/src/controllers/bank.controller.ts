import { NextFunction, Request, Response } from 'express'
import { BankService } from '../services/bank.service'

export class BankController {
  private bankService: BankService

  constructor() {
    this.bankService = new BankService()
  }

  public async getPaid(req: Request, res: Response, next: NextFunction) {
    let codeResponse :number = 500
    let messageResponse :string = 'error'

    try {
      const clientMail = req.body.client
      const amount = Number(req.body.bill)
      if (clientMail && amount) {
        const codeFromBank = await this.bankService.doTransaction(clientMail, amount)
        codeResponse = codeFromBank
        if (codeFromBank === 200) {
          messageResponse = 'paiement validé par la banque'
        } else if (codeFromBank === 404) {
          messageResponse = 'client inexistant'
        } else if (codeFromBank === 409) {
          messageResponse = 'fonds insuffisant'
        }
      } else {
        codeResponse = 400
        messageResponse = "la requête doit contenir un champ 'client' et un champ 'bill'"
      }

      res.status(codeResponse).json(messageResponse)
    } catch (error) {
      console.error('BankController.getPaid - Erreur lors de la transaction : ', error)
      res.status(500).json({ error: 'Erreur lors du virement' })
      next(error)
    }
  }
}
