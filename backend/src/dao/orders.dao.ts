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

  public async getOrderById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM order WHERE id = ?';

      this.db.query(query, [id], (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  public async createOrder(order: any): Promise<any> { // typer Order
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO order SET ?';

      this.db.query(query, [order], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...order });
        }
      });
    });
  }

  public async updateOrder(id: number, order: any): Promise<any> { // typer order
    return new Promise((resolve, reject) => {
      const query = 'UPDATE order SET ? WHERE id = ?';

      this.db.query(query, [order, id], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...order });
        }
      });
    });
  }

  public async deleteOrder(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM order WHERE id = ?';

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
