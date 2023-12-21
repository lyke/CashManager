import * as mysql from 'mysql';

import { AdminsDao } from "../dao/admins.dao";
import { Admin } from "../types/admin";

export class AdminsService {
  private adminsDao: AdminsDao;

  constructor() {
    this.adminsDao = new AdminsDao();
  }

  public async getAllAdmins() {
    return this.adminsDao.getAllAdmins();
  }

  public async getAdminById(id: number) {
    return this.adminsDao.getAdminById(id);
  }

  public async createAdmin(admin: Admin) {
    return this.adminsDao.createAdmin(admin);
  }

  public async updateAdmin(id: number, admin: Admin) {
    return this.adminsDao.updateAdmin(id, admin);
  }

  public async deleteAdmin(id: number) {
    return this.adminsDao.deleteAdmin(id);
  }
}
