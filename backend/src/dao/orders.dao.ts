export class OrdersDao {
  constructor(private db: any) {}

  public getAllOrders(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM order';

      try {
        const results = await this.db.query(query);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }
}
