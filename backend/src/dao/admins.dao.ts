import * as mysql from 'mysql';

import { Admin, DeleteAdminResponse } from '../types/admin';

export class AdminsDao {
  constructor(private db: mysql.Connection) {}

  public async getAllAdmins(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin';

      this.db.query(query, (error: mysql.MysqlError | null, results: Admin[]) => {
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

      this.db.query(query, [id], (error: mysql.MysqlError | null, results: Admin) => {
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

      this.db.query(query, [admin], (error: mysql.MysqlError | null, results: Admin) => {
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

      this.db.query(query, [admin, id], (error: mysql.MysqlError | null) => {
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

      this.db.query(query, [id], (error: mysql.MysqlError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }
}
