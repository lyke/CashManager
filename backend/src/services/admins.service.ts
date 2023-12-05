import { AdminsDao } from "../dao/admins.dao";

export class AdminsService {
  private adminsDao: AdminsDao;

  constructor(db: any) {
    this.adminsDao = new AdminsDao(db);
  }

  public async getAllAdmins() {
    return this.adminsDao.getAllAdmins();
  }

  public async getAdminById(id: number) {
    return this.adminsDao.getAdminById(id);
  }

  public async createAdmin(admin: any) { // typer admin
    return this.adminsDao.createAdmin(admin);
  }

  public async updateAdmin(id: number, admin: any) { // typer admin
    return this.adminsDao.updateAdmin(id, admin);
  }

  public async deleteAdmin(id: number) {
    return this.adminsDao.deleteAdmin(id);
  }
}
