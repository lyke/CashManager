export class ProductsDao {
  constructor(private db: any) {}

  public async getAllProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product';

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
