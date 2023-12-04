import { ProductsDao } from '../dao/products.dao';
export class ProductsService {
  private productsDao: ProductsDao;

  constructor(db: any) {
    this.productsDao = new ProductsDao(db);
  }

  public async getAllProducts() {
    return this.productsDao.getAllProducts();
  }
}
