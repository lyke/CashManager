import * as mysql from 'mysql';

import { DeleteProductResponse, Product } from '../types/product';

export class ProductsDao {
  constructor(private db: mysql.Connection) {}

  public async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product';

      this.db.query(query, (error: mysql.MysqlError | null, results: Product[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product WHERE id = ?';

      this.db.query(query, [id], (error: mysql.MysqlError | null, results: Product) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async createProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO product SET ?';

      this.db.query(query, [product], (error: mysql.MysqlError | null, results: Product) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...product });
        }
      });
    });
  }

  public async updateProduct(id: number, product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE product SET ? WHERE id = ?';

      this.db.query(query, [product, id], (error: mysql.MysqlError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...product });
        }
      });
    });
  }

  public async deleteProduct(id: number): Promise<DeleteProductResponse> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM product WHERE id = ?';

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
