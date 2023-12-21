import { DeleteProductResponse, Product } from '../types/product';
import { DatabaseError, DatabaseServiceInterface } from './database/databaseServiceInterface'
import { DatabaseServiceFactory } from './database/databaseServiceFactory'

export class ProductsDao {
  private db: DatabaseServiceInterface
  constructor() {
    this.db = new DatabaseServiceFactory().getDatabaseService()
  }

  public async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product';

      this.db.queryCallback(query, (error: DatabaseError | null, results: Product[]) => {
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

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null, results: Product) => {
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

  public async createProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO product SET ?';

      this.db.queryCallbackValues(query, [product], (error: DatabaseError | null, results: Product) => {
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

      this.db.queryCallbackValues(query, [product, id], (error: DatabaseError | null) => {
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
