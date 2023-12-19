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

  public async getAccountById(mail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM '+this.tableName+' WHERE mail = ?';

      this.db.query(query, [mail], (error: any, results: any[]) => {
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
          resolve({ account });
        }
      });
    });
  }

  public async updateAccount(mail: string, account: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE '+this.tableName+' SET ? WHERE mail = ?';

      this.db.query(query, [account, mail], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ mail, ...account });
        }
      });
    });
  }

  public async deleteAccount(mail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM '+this.tableName+' WHERE mail = ?';

      this.db.query(query, [mail], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ mail });
        }
      });
    });
  }

}
