export class AccountDao {
  private tableName: string = "account"
  constructor(private db: any) {}

  public async getAccountById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM '+this.tableName+' WHERE id = ?';

      this.db.query(query, [id], (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  public async createAdmin(account: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO '+this.tableName+' SET ?';

      this.db.query(query, [account], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...account });
        }
      });
    });
  }

  public async updateAdmin(id: number, account: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE '+this.tableName+' SET ? WHERE id = ?';

      this.db.query(query, [account, id], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...account });
        }
      });
    });
  }

}
