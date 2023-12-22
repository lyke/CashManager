import { BankAdapterInterface } from './bankAdapterInterface'
import { BankRootAdapter } from './bankRootAdapter'

export class BankAdapterFactory {
  private static bankAdaptater: BankAdapterInterface
  constructor() {
    if ( ! BankAdapterFactory.bankAdaptater ){
      BankAdapterFactory.bankAdaptater = new BankRootAdapter()
    }
  }

  public getBankAdaptater(): BankAdapterInterface {
    return BankAdapterFactory.bankAdaptater
  }

}