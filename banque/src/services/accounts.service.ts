import { AccountDao } from '../dao/account.dao'
export class AccountsService {
  private accountDao: AccountDao;

  constructor(db: any) {
    this.accountDao = new AccountDao(db);
  }

  async removeFromAccount(idToDebit: number, amount: number) {
    let account = await this.accountDao.getAccountById(idToDebit)

    if ( !account.money || account.money < amount) { return  false }

    account.money -= amount
    await this.accountDao.updateAccount(idToDebit, account)
    return true
  }

  async addToAccount(idToCredit: number, amount: number) {
    let account = await this.accountDao.getAccountById(idToCredit)
    account.money += amount
    await this.accountDao.updateAccount(idToCredit, account)
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
