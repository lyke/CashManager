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
}
