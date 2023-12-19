export class AccountDao {
  private readonly tableName: string = "account"
  constructor(private db: any) {}

  public async getAllAccounts(): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM '+this.tableName;

      this.db.query(query, (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

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

  public async createAccount(account: any): Promise<any> {
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

  public async updateAccount(id: number, account: any): Promise<any> {
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

  public async deleteAccount(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM '+this.tableName+' WHERE id = ?';

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
