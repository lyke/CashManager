import { BankAdapterFactory } from '../adapter/bankAdapterFactory'
import { BankAdapterInterface } from '../adapter/bankAdapterInterface'

export class BankService {
  private bankAdapter: BankAdapterInterface

  constructor() {
    this.bankAdapter = new BankAdapterFactory().getBankAdaptater()
  }

  public async doTransaction(clientEmail: string, amount: number) :Promise<number> {
    return this.bankAdapter.doTransaction(clientEmail, amount)
  }
}
