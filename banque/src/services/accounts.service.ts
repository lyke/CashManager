import { AccountDao } from '../dao/account.dao'
export class AccountsService {
  private accountDao: AccountDao;

  constructor(db: any) {
    this.accountDao = new AccountDao(db);
  }

  async removeFromAccount(idToDebit: number, amount: number) {
    return false
  }

  addToAccount(idToCredit: number, amount: number) {
  }

  async getAllAccounts() {
    return this.accountDao.getAllAccounts()
  }

  async getAccountById(id: number) {
    return this.accountDao.getAccountById(id)
  }

  async updateAccount(id: number, account: any) {
    return this.accountDao.updateAccount(id, account)
  }

  async deleteAccount(id: number) {
    return this.accountDao.deleteAccount(id)
  }

  async createAccount(account: any) {
    return this.accountDao.createAccount(account)
  }

}
