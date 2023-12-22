import { BankAdapterInterface } from './bankAdapterInterface'

export class BankRootAdapter implements BankAdapterInterface{
  private readonly url: string = 'http://localhost:5002/api/transactions/'
  private readonly mailOfTheCompany: string = 'mail_de_l_entreprise'

  public async doTransaction(mailToDebit: string, amount: number): Promise<number> {
    const body: TransactionBody = {
      mailToCredit: this.mailOfTheCompany,
      mailToDebit: mailToDebit,
      amount: amount
    }

    try {
      const response = await fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      )

      return response.status
    } catch (e) {
      console.log(e)
      return 500
    }
  }

}

interface TransactionBody {
  mailToDebit: string
  mailToCredit: string
  amount: number
}