import * as mysql from 'mysql';
import { DatabaseError, DatabaseServiceInterface } from './database/databaseServiceInterface'
import { MysqlService } from './database/mysqlService'

import { Admin, DeleteAdminResponse } from '../types/admin';
import { DatabaseServiceFactory } from './database/databaseServiceFactory'

export class AdminsDao {
  private db: DatabaseServiceInterface
  constructor() {
    this.db = new DatabaseServiceFactory().getDatabaseService()
  }

  public async getAllAdmins(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin';

      this.db.queryCallback(query, (error: DatabaseError | null, results: Admin[]) => {
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

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null, results: Admin) => {
        if (error) {
          reject(error);
        } else {

          if (Array.isArray(results)) {
            resolve(results[0]);
          } else {
            resolve(results);
          }

        }
      });
    });
  }

  public async createAdmin(admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO admin SET ?';

      this.db.queryCallbackValues(query, [admin], (error: DatabaseError | null, results: Admin) => {
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

      this.db.queryCallbackValues(query, [admin, id], (error: DatabaseError | null) => {
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

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }
}
