
export class AccountsService {
  // private adminsDao: AdminsDao;

  constructor(db: any) {
    // this.adminsDao = new AdminsDao(db);
  }

  async removeFromAccount(idToDebit: number, amount: number) {
    return false
  }

  addToAccount(idToCredit: number, amount: number) {
  }
}
