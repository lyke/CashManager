import { AccountDao } from '../dao/account.dao'
export class AccountsService {
  private adminsDao: AccountDao;

  constructor(db: any) {
    this.adminsDao = new AccountDao(db);
  }

  async removeFromAccount(idToDebit: number, amount: number) {
    return false
  }

  addToAccount(idToCredit: number, amount: number) {
  }
}
