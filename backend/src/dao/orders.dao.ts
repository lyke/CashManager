import * as mysql from 'mysql';

import { DeleteOrderResponse, Order } from '../types/order';
import { DatabaseError, DatabaseServiceInterface } from './database/databaseServiceInterface'
import { MysqlService } from './database/mysqlService'

export class OrdersDao {
  private db: DatabaseServiceInterface
  constructor(db: mysql.Connection) {
    this.db = new MysqlService(db)
  }
  public async getAllOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `order`';

      this.db.queryCallback(query, (error: DatabaseError | null, results: Order[]) => {
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

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null, results: Order) => {
        if (error) {
          reject(error);
        } else {
          if (Array.isArray(results)) {
            resolve(results[0]);
          } else {
            resolve(results);
          }
        }
      });
    });
  }

  public async createOrder(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `order` SET ?';

      this.db.queryCallbackValues(query, [order], (error: DatabaseError | null, results: Order) => {
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

      this.db.queryCallbackValues(query, [order, id], (error: DatabaseError | null) => {
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

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }
}
