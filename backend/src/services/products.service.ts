import * as mysql from 'mysql';

import { ProductsDao } from '../dao/products.dao';
import { Product } from '../types/product';
export class ProductsService {
  private productsDao: ProductsDao;

  constructor() {
    this.productsDao = new ProductsDao();
  }

  public async getAllProducts() {
    return this.productsDao.getAllProducts();
  }

  public async getProductById(id: number) {
    return this.productsDao.getProductById(id);
  }

  public async createProduct(product: Product) {
    return this.productsDao.createProduct(product);
  }

  public async updateProduct(id: number, product: Product) {
    return this.productsDao.updateProduct(id, product);
  }

  public async deleteProduct(id: number) {
    return this.productsDao.deleteProduct(id);
  }
}
