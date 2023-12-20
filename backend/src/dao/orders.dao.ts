import * as mysql from 'mysql';

import { DeleteOrderResponse, Order } from '../types/order';

export class OrdersDao {
  constructor(private db: mysql.Connection) {}

  public async getAllOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `order`';

      this.db.query(query, (error: mysql.MysqlError | null, results: Order[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }


  public async getOrderById(id: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `order` WHERE id = ?';

      this.db.query(query, [id], (error: mysql.MysqlError | null, results: Order) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async createOrder(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `order` SET ?';

      this.db.query(query, [order], (error: mysql.MysqlError | null, results: Order) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...order });
        }
      });
    });
  }

  public async updateOrder(id: number, order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE `order` SET ? WHERE id = ?';

      this.db.query(query, [order, id], (error: mysql.MysqlError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...order });
        }
      });
    });
  }

  public async deleteOrder(id: number): Promise<DeleteOrderResponse> {
    return new Promise<DeleteOrderResponse>((resolve, reject) => {
      const query = 'DELETE FROM `order` WHERE id = ?';

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
