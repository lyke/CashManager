import { AccountDao } from '../dao/account.dao'
export class AccountsService {
  private accountDao: AccountDao;

  constructor(db: any) {
    this.accountDao = new AccountDao(db);
  }

  async removeFromAccount(mailToDebit: string, amount: number) {
    let account = await this.accountDao.getAccountById(mailToDebit)

    if ( !account.money || account.money < amount) { return  false }

    account.money -= amount
    await this.accountDao.updateAccount(mailToDebit, account)
    return true
  }

  async addToAccount(mailToCredit: string, amount: number) {
    let account = await this.accountDao.getAccountById(mailToCredit)
    account.money += amount
    await this.accountDao.updateAccount(mailToCredit, account)
  }

  async getAllAccounts() {
    return this.accountDao.getAllAccounts()
  }

  async getAccountById(mail: string) {
    return this.accountDao.getAccountById(mail)
  }

  async updateAccount(mail: string, account: any) {
    return this.accountDao.updateAccount(mail, account)
  }

  async deleteAccount(mail: string) {
    return this.accountDao.deleteAccount(mail)
  }

  async createAccount(account: any) {
    return this.accountDao.createAccount(account)
  }

}
