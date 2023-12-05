import { AdminsDao } from "../dao/admins.dao";

export class AdminsService {
  private adminsDao: AdminsDao;

  constructor(db: any) {
    this.adminsDao = new AdminsDao(db);
  }

  public async getAllAdmins() {
    return this.adminsDao.getAllAdmins();
  }
}
