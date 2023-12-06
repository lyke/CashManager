import { ProductsDao } from '../dao/products.dao';
export class ProductsService {
  private productsDao: ProductsDao;

  constructor(db: any) {
    this.productsDao = new ProductsDao(db);
  }

  public async getAllProducts() {
    return this.productsDao.getAllProducts();
  }

  public async getProductById(id: number) {
    return this.productsDao.getProductById(id);
  }

  public async createProduct(product: any) { // typer Product
    return this.productsDao.createProduct(product);
  }

  public async updateProduct(id: number, product: any) { // typer Product
    return this.productsDao.updateProduct(id, product);
  }

  public async deleteProduct(id: number) {
    return this.productsDao.deleteProduct(id);
  }
}
