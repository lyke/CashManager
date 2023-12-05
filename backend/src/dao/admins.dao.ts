export class AdminsDao {
  constructor(private db: any) {}

  public async getAllAdmins(): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin';

      this.db.query(query, (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async getAdminById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin WHERE id = ?';

      this.db.query(query, [id], (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  public async createAdmin(admin: any): Promise<any> { // typer admin
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO admin SET ?';

      this.db.query(query, [admin], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...admin });
        }
      });
    });
  }

  public async updateAdmin(id: number, admin: any): Promise<any> { // typer admin
    return new Promise((resolve, reject) => {
      const query = 'UPDATE admin SET ? WHERE id = ?';

      this.db.query(query, [admin, id], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...admin });
        }
      });
    });
  }

  public async deleteAdmin(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM admin WHERE id = ?';

      this.db.query(query, [id], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }
}
