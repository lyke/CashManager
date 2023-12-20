import * as mysql from 'mysql';
import { DatabaseServiceInterface } from './mysql/databaseServiceInterface';
import { MysqlService } from './mysql/mysqlService'

import { Admin, DeleteAdminResponse } from '../types/admin';

export class AdminsDao {
  private db: DatabaseServiceInterface
  constructor(db: mysql.Connection) {
    this.db = new MysqlService(db)
  }

  public async getAllAdmins(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin';

      this.db.queryCallback(query, (error: mysql.MysqlError | null, results: Admin[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });


    });
  }

  public async getAdminById(id: number): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin WHERE id = ?';

      this.db.queryCallbackValues(query, [id], (error: mysql.MysqlError | null, results: Admin) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  public async createAdmin(admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO admin SET ?';

      this.db.queryCallbackValues(query, [admin], (error: mysql.MysqlError | null, results: Admin) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...admin });
        }
      });
    });
  }

  public async updateAdmin(id: number, admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE admin SET ? WHERE id = ?';

      this.db.queryCallbackValues(query, [admin, id], (error: mysql.MysqlError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...admin });
        }
      });
    });
  }

  public async deleteAdmin(id: number): Promise<DeleteAdminResponse> {
    return new Promise<DeleteAdminResponse>((resolve, reject) => {
      const query = 'DELETE FROM admin WHERE id = ?';

      this.db.queryCallbackValues(query, [id], (error: mysql.MysqlError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }
}
