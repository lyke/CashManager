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

  public async getProductById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product WHERE id = ?';

      this.db.query(query, [id], (error: any, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  public async createProduct(product: any): Promise<any> { // typer Product
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO product SET ?';

      this.db.query(query, [product], (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...product });
        }
      });
    });
  }

  public async updateProduct(id: number, product: any): Promise<any> { // typer Product
    return new Promise((resolve, reject) => {
      const query = 'UPDATE product SET ? WHERE id = ?';

      this.db.query(query, [product, id], (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...product });
        }
      });
    });
  }

  public async deleteProduct(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM product WHERE id = ?';

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
